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
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
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
        setErrorMessage(json.error || "Pendaftaran tidak berhasil.");
      } else {
        router.push("/login?registered=true");
      }
    } catch (err) {
      setErrorMessage("Terjadi masalah koneksi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/30 mb-2">
          <Hotel className="h-7 w-7" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Daftar Akun Tamu</h1>
        <p className="text-xs font-medium text-slate-500">
          Buat akun untuk memesan layanan kamar secara mandiri
        </p>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 text-center">
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
          placeholder="contoh: 101"
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

        <Button type="submit" className="w-full rounded-full py-3 text-sm font-bold shadow-md" isLoading={isLoading}>
          Buat Akun Tamu
        </Button>
      </form>

      <div className="text-center text-xs font-medium text-slate-500 pt-2 border-t border-slate-100">
        Sudah memiliki akun?{" "}
        <Link href="/login" className="font-bold text-violet-600 hover:underline">
          Masuk di sini
        </Link>
      </div>
    </div>
  );
};
