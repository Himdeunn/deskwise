"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { User, Shield, KeyRound, CheckCircle2 } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  password: z.string().min(6, "Password minimal 6 karakter").optional().or(z.literal("")),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    values: {
      name: session?.user?.name || "",
      password: "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setErrorMessage(json.error || "Gagal memperbarui profil.");
      } else {
        setSuccessMessage("Profil Anda berhasil diperbarui!");
        // Update session client side
        await update({
          ...session,
          user: {
            ...session?.user,
            name: json.name,
          },
        });
      }
    } catch (err) {
      setErrorMessage("Terjadi kesalahan koneksi.");
    } finally {
      setIsLoading(false);
    }
  };

  const roleLabel =
    session?.user?.role === "SUPER_ADMIN"
      ? "Super Admin"
      : session?.user?.role === "ADMIN"
      ? "Staf Hotel"
      : "Tamu Hotel";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#0F3D91] tracking-tight">
          Profil & Pengaturan Akun
        </h1>
        <p className="text-xs text-slate-500 font-semibold mt-1">
          Kelola informasi data pribadi dan kredensial akses akun Anda.
        </p>
      </div>

      {/* Profile Overview Banner Card */}
      <Card className="rounded-3xl p-6 border border-slate-100 shadow-xs bg-white flex flex-col sm:flex-row items-center gap-5">
        <div className="h-16 w-16 rounded-3xl bg-[#0F3D91] text-white text-xl font-extrabold flex items-center justify-center shadow-md shadow-blue-900/15">
          {session?.user?.name?.substring(0, 2).toUpperCase() || "DW"}
        </div>
        <div className="space-y-1 text-center sm:text-left flex-1">
          <h2 className="text-lg font-extrabold text-slate-900">{session?.user?.name}</h2>
          <p className="text-xs text-slate-500 font-medium">{session?.user?.email}</p>
          <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
            <span className="px-3 py-0.5 text-[10px] font-extrabold bg-[#f0f5ff] text-[#0F3D91] border border-[#BBD4FF]/60 rounded-full inline-flex items-center gap-1">
              <Shield className="w-3 h-3 text-[#1A73E8]" />
              {roleLabel}
            </span>
            {session?.user?.roomNumber && (
              <span className="px-3 py-0.5 text-[10px] font-extrabold bg-slate-100 text-slate-700 rounded-full">
                Kamar {session.user.roomNumber}
              </span>
            )}
          </div>
        </div>
      </Card>

      {/* Form Settings Card */}
      <Card className="rounded-3xl p-6 border border-slate-100 shadow-xs bg-white space-y-6">
        <div className="flex items-center gap-2 text-[#0F3D91] border-b border-slate-100 pb-3">
          <User className="h-5 w-5 text-[#1A73E8]" />
          <h3 className="text-base font-extrabold">Ubah Profil & Sandi</h3>
        </div>

        {successMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap Anda"
            error={errors.name?.message}
            {...register("name")}
          />

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700">Alamat Email (Tetap)</label>
            <input
              type="text"
              disabled
              value={session?.user?.email || ""}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-500 cursor-not-allowed"
            />
          </div>

          <Input
            label="Password Baru (Kosongkan jika tidak ingin mengubah)"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password")}
          />

          <div className="pt-2">
            <Button type="submit" isLoading={isLoading} className="rounded-full px-6 py-2.5 font-extrabold text-xs">
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
