"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Hotel } from "lucide-react";

const registerSchema = z.object({
  name: z.string().min(2, "Nama lengkap minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  roomNumber: z.string().min(1, "Nomor kamar wajib diisi"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setErrorMessage(json.error || "Gagal melakukan pendaftaran.");
      } else {
        router.push("/login?registered=true");
      }
    } catch (err) {
      setErrorMessage("Terjadi kesalahan koneksi saat mendaftar.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-sky-50 text-sky-600 mb-2">
          <Hotel className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">DeskWise Guest</h1>
        <p className="text-sm text-slate-500">
          Registrasi Tamu Hotel untuk Layanan Self-Service
        </p>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-xs font-medium text-rose-700">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Nama Lengkap"
          placeholder="contoh: Ahmad Subagja"
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          label="Email"
          type="email"
          placeholder="contoh: ahmad@gmail.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Nomor Kamar"
          placeholder="contoh: 204"
          error={errors.roomNumber?.message}
          {...register("roomNumber")}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register("password")}
        />

        <Button type="submit" className="w-full" isLoading={isLoading}>
          Daftar Akun Tamu
        </Button>
      </form>

      <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
        Sudah memiliki akun?{" "}
        <Link href="/login" className="font-semibold text-sky-600 hover:underline">
          Masuk di sini
        </Link>
      </div>
    </div>
  );
};
