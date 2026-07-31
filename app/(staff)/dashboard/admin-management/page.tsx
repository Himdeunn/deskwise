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
      console.error("Failed to load admin list:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleDeleteAdmin = async (id: string) => {
    if (!confirm("Are you sure you want to delete this admin account? This action cannot be undone.")) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin-users/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchAdmins();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to delete admin account.");
      }
    } catch {
      alert("A connection error occurred. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Admin Team Management
            </h1>
            <span className="px-2.5 py-0.5 text-[10px] font-bold bg-violet-100 text-violet-700 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Super Admin
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Manage creation and access rights for DeskWise staff accounts.
          </p>
        </div>

        <Button onClick={() => setIsModalOpen(true)} className="self-start sm:self-auto rounded-full">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Staff Admin
        </Button>
      </div>

      {isLoading ? (
        <Skeleton className="h-64 w-full rounded-3xl" />
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
