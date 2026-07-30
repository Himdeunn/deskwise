import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  roomNumber: z.string().min(1, "Nomor kamar wajib diisi"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validasi data gagal", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { name, email, password, roomNumber } = validation.data;
    const lowerEmail = email.toLowerCase().trim();

    const existingUser = await prisma.user.findUnique({
      where: { email: lowerEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email sudah terdaftar. Silakan login." },
        { status: 400 }
      );
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    const newCustomer = await prisma.user.create({
      data: {
        name,
        email: lowerEmail,
        passwordHash,
        role: "CUSTOMER",
        roomNumber,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        roomNumber: true,
      },
    });

    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    console.error("POST /api/register error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
