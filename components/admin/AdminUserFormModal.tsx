"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const createAdminSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

type AdminFormValues = z.infer<typeof createAdminSchema>;

interface AdminUserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminUserFormModal: React.FC<AdminUserFormModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminFormValues>({
    resolver: zodResolver(createAdminSchema),
  });

  const onSubmit = async (data: AdminFormValues) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/admin-users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setErrorMessage(json.error || "Gagal membuat akun Admin.");
      } else {
        reset();
        onSuccess();
        onClose();
      }
    } catch (err) {
      setErrorMessage("Terjadi kesalahan koneksi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Tambah Staf Admin Baru">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm">
        {errorMessage && (
          <div className="p-3 rounded-lg bg-rose-50 text-rose-700 text-xs font-medium border border-rose-200">
            {errorMessage}
          </div>
        )}

        <Input
          label="Nama Lengkap Staf"
          placeholder="contoh: Rina Wulandari"
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          label="Email Staf"
          type="email"
          placeholder="contoh: admin.rina@deskwise.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Password Akses"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="flex gap-2 pt-2 justify-end">
          <Button type="button" variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Simpan Akun Admin
          </Button>
        </div>
      </form>
    </Modal>
  );
};
