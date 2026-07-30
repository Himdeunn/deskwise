"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { AdminUserTable, AdminUserItem } from "@/components/admin/AdminUserTable";
import { AdminUserFormModal } from "@/components/admin/AdminUserFormModal";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { UserPlus, ShieldCheck } from "lucide-react";

export default function AdminManagementPage() {
  const { data: session } = useSession();
  const [admins, setAdmins] = useState<AdminUserItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAdmins = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin-users");
      if (res.ok) {
        const data = await res.json();
        setAdmins(data);
      }
    } catch (e) {
      console.error("Gagal mengambil data admin:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleDeleteAdmin = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus akun admin ini?")) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin-users/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchAdmins();
      } else {
        const err = await res.json();
        alert(err.error || "Gagal menghapus admin.");
      }
    } catch (e) {
      alert("Terjadi kesalahan koneksi.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Manajemen Akun Staf Admin
            </h1>
            <span className="px-2 py-0.5 text-xs font-bold bg-purple-100 text-purple-800 rounded-md flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              SUPER_ADMIN
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Kelola pembuatan dan penghapusan akun staf yang berhak mengakses dashboard operasional.
          </p>
        </div>

        <Button onClick={() => setIsModalOpen(true)} className="self-start sm:self-auto">
          <UserPlus className="w-4 h-4 mr-2" />
          Tambah Staf Admin
        </Button>
      </div>

      {isLoading ? (
        <Skeleton className="h-64 w-full rounded-xl" />
      ) : (
        <AdminUserTable
          admins={admins}
          currentUserId={session?.user?.id || ""}
          onDeleteAdmin={handleDeleteAdmin}
          isDeleting={isDeleting}
        />
      )}

      <AdminUserFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchAdmins}
      />
    </div>
  );
}
