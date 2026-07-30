import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const createAdminSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export async function GET() {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "Akses ditolak. Fitur ini khusus Super Admin." },
        { status: 403 }
      );
    }

    const admins = await prisma.user.findMany({
      where: {
        role: {
          in: ["ADMIN", "SUPER_ADMIN"],
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(admins);
  } catch (error) {
    console.error("GET /api/admin-users error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "Akses ditolak. Fitur ini khusus Super Admin." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const validation = createAdminSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validasi gagal", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { name, email, password } = validation.data;
    const lowerEmail = email.toLowerCase().trim();

    const existingUser = await prisma.user.findUnique({
      where: { email: lowerEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email sudah terdaftar di dalam sistem." },
        { status: 400 }
      );
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    const newAdmin = await prisma.user.create({
      data: {
        name,
        email: lowerEmail,
        passwordHash,
        role: "ADMIN",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(newAdmin, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin-users error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
