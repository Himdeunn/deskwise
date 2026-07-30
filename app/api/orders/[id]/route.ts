import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { OrderStatus, PaymentStatus } from "@prisma/client";

const updateOrderSchema = z.object({
  status: z.nativeEnum(OrderStatus).optional(),
  paymentStatus: z.nativeEnum(PaymentStatus).optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role === "CUSTOMER") {
      return NextResponse.json(
        { error: "Tamu tidak diperbolehkan mengubah status pesanan." },
        { status: 403 }
      );
    }

    const { id } = params;
    const body = await req.json();

    const validation = updateOrderSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Data status tidak valid", details: validation.error.format() },
        { status: 400 }
      );
    }

    const existingOrder = await prisma.order.findUnique({
      where: { id },
    });

    if (!existingOrder) {
      return NextResponse.json({ error: "Pesanan tidak ditemukan" }, { status: 404 });
    }

    const updateData: any = {};

    if (validation.data.status) {
      updateData.status = validation.data.status;
      updateData.handledById = session.user.id;
    }

    if (validation.data.paymentStatus) {
      updateData.paymentStatus = validation.data.paymentStatus;
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: updateData,
      include: {
        guest: {
          select: { id: true, name: true, email: true, role: true, roomNumber: true },
        },
        handledBy: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("PATCH /api/orders/[id] error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
