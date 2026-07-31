"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Shield, Trash2 } from "lucide-react";

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
    return (
      <EmptyState
        title="Tidak Ada Akun Staf"
        description="Belum ada akun Admin/Staf tambahan yang terdaftar."
      />
    );
  }

  return (
    <div className="space-y-3">
      {/* Desktop Table (md+) */}
      <div className="hidden md:block overflow-x-auto rounded-3xl border border-slate-100 bg-white shadow-xs">
        <table className="w-full min-w-[560px] text-left text-xs text-slate-600">
          <thead className="bg-slate-50/80 text-[11px] uppercase font-bold text-slate-400 border-b border-slate-100 tracking-wider">
            <tr>
              <th className="px-5 lg:px-6 py-4">Nama Staf</th>
              <th className="px-5 lg:px-6 py-4">Email</th>
              <th className="px-5 lg:px-6 py-4">Peran</th>
              <th className="px-5 lg:px-6 py-4">Terdaftar</th>
              <th className="px-5 lg:px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {admins.map((admin) => (
              <tr key={admin.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-5 lg:px-6 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-[#f0f5ff] text-[#0F3D91] flex items-center justify-center font-extrabold text-xs shrink-0">
                      {admin.name.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="font-bold text-slate-900 truncate max-w-[140px]">{admin.name}</span>
                  </div>
                </td>
                <td className="px-5 lg:px-6 py-3.5 text-slate-600 truncate max-w-[180px]">{admin.email}</td>
                <td className="px-5 lg:px-6 py-3.5">
                  <Badge variant={admin.role === "SUPER_ADMIN" ? "purple" : "info"} className="rounded-full">
                    <Shield className="w-3 h-3 mr-1 shrink-0" />
                    {admin.role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
                  </Badge>
                </td>
                <td className="px-5 lg:px-6 py-3.5 text-xs text-slate-500 whitespace-nowrap">
                  {new Date(admin.createdAt).toLocaleDateString("id-ID")}
                </td>
                <td className="px-5 lg:px-6 py-3.5 text-right">
                  {admin.id !== currentUserId && admin.role !== "SUPER_ADMIN" && (
                    <Button
                      size="sm"
                      variant="danger"
                      isLoading={isDeleting}
                      onClick={() => onDeleteAdmin(admin.id)}
                      className="py-1 px-3 text-xs rounded-full"
                    >
                      <Trash2 className="w-3 h-3 mr-1 shrink-0" />
                      Hapus
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List (<md) */}
      <div className="md:hidden space-y-3">
        {admins.map((admin) => (
          <div
            key={admin.id}
            className="p-4 bg-white rounded-3xl border border-slate-100 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-9 w-9 rounded-full bg-[#f0f5ff] text-[#0F3D91] flex items-center justify-center font-extrabold text-xs shrink-0">
                  {admin.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="font-extrabold text-slate-900 text-sm truncate">{admin.name}</p>
                  <p className="text-xs text-slate-500 truncate">{admin.email}</p>
                </div>
              </div>
              <Badge variant={admin.role === "SUPER_ADMIN" ? "purple" : "info"} className="rounded-full shrink-0">
                <Shield className="w-3 h-3 mr-1" />
                {admin.role === "SUPER_ADMIN" ? "Super" : "Admin"}
              </Badge>
            </div>
            <div className="flex items-center justify-between pt-2.5 border-t border-slate-100">
              <span className="text-[11px] text-slate-400 font-medium">
                Terdaftar {new Date(admin.createdAt).toLocaleDateString("id-ID")}
              </span>
              {admin.id !== currentUserId && admin.role !== "SUPER_ADMIN" && (
                <Button
                  size="sm"
                  variant="danger"
                  isLoading={isDeleting}
                  onClick={() => onDeleteAdmin(admin.id)}
                  className="py-1 px-3 text-xs rounded-full"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Hapus
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
