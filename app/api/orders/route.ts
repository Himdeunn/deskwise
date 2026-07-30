import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { ServiceType } from "@prisma/client";

const createOrderSchema = z.object({
  service: z.nativeEnum(ServiceType),
  quantity: z.number().int().min(1).max(20),
  specialRequest: z.string().max(500).optional(),
});

const SERVICE_PRICES: Record<ServiceType, number> = {
  RoomService: 150000,
  Housekeeping: 0,
  Laundry: 45000,
  ExtraBed: 350000,
  SpaMassage: 450000,
};

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const service = searchParams.get("service") || "";

    const isCustomer = session.user.role === "CUSTOMER";

    const whereCondition: any = {};

    if (isCustomer) {
      whereCondition.guestId = session.user.id;
    }

    if (status && status !== "ALL") {
      whereCondition.status = status;
    }

    if (service && service !== "ALL") {
      whereCondition.service = service;
    }

    if (search && !isCustomer) {
      whereCondition.OR = [
        { roomNumber: { contains: search, mode: "insensitive" } },
        { guest: { name: { contains: search, mode: "insensitive" } } },
        { specialRequest: { contains: search, mode: "insensitive" } },
      ];
    }

    const orders = await prisma.order.findMany({
      where: whereCondition,
      include: {
        guest: {
          select: { id: true, name: true, email: true, role: true, roomNumber: true },
        },
        handledBy: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "CUSTOMER") {
      return NextResponse.json(
        { error: "Hanya tamu hotel (CUSTOMER) yang dapat membuat order." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const validation = createOrderSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validasi data gagal", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { service, quantity, specialRequest } = validation.data;
    const unitPrice = SERVICE_PRICES[service] || 0;
    const totalAmount = unitPrice * quantity;

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    const roomNumber = user?.roomNumber || session.user.roomNumber || "Unassigned";

    const newOrder = await prisma.order.create({
      data: {
        guestId: session.user.id,
        roomNumber,
        service,
        quantity,
        amount: totalAmount,
        specialRequest: specialRequest || null,
        status: "New",
        paymentStatus: totalAmount > 0 ? "Pending" : "Paid",
      },
      include: {
        guest: {
          select: { id: true, name: true, email: true, role: true, roomNumber: true },
        },
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
