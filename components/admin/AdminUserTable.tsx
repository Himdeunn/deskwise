"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Shield, Trash2, UserCheck } from "lucide-react";

export interface AdminUserItem {
  id: string;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN";
  createdAt: string;
}

interface AdminUserTableProps {
  admins: AdminUserItem[];
  currentUserId: string;
  onDeleteAdmin: (id: string) => void;
  isDeleting: boolean;
}

export const AdminUserTable: React.FC<AdminUserTableProps> = ({
  admins,
  currentUserId,
  onDeleteAdmin,
  isDeleting,
}) => {
  if (admins.length === 0) {
    return <EmptyState title="Tidak Ada Akun Staf" description="Belum ada akun Admin/Staf tambahan yang terdaftar." />;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200/80 bg-white shadow-xs">
      <table className="w-full text-left text-sm text-slate-600">
        <thead className="bg-slate-50/80 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200/80">
          <tr>
            <th className="px-4 py-3.5">Nama Staf</th>
            <th className="px-4 py-3.5">Email</th>
            <th className="px-4 py-3.5">Role System</th>
            <th className="px-4 py-3.5">Tanggal Dibuat</th>
            <th className="px-4 py-3.5 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {admins.map((admin) => (
            <tr key={admin.id} className="hover:bg-slate-50/60 transition-colors">
              <td className="px-4 py-3 font-semibold text-slate-900 flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs">
                  {admin.name.slice(0, 2).toUpperCase()}
                </div>
                <span>{admin.name}</span>
              </td>
              <td className="px-4 py-3 text-slate-600">{admin.email}</td>
              <td className="px-4 py-3">
                <Badge variant={admin.role === "SUPER_ADMIN" ? "purple" : "info"}>
                  <Shield className="w-3 h-3 mr-1" />
                  {admin.role}
                </Badge>
              </td>
              <td className="px-4 py-3 text-xs text-slate-500">
                {new Date(admin.createdAt).toLocaleDateString("id-ID")}
              </td>
              <td className="px-4 py-3 text-right">
                {admin.id !== currentUserId && admin.role !== "SUPER_ADMIN" && (
                  <Button
                    size="sm"
                    variant="danger"
                    isLoading={isDeleting}
                    onClick={() => onDeleteAdmin(admin.id)}
                    className="py-1 px-2.5 text-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1" />
                    Hapus
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
