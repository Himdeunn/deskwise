"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import { LogOut, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const Navbar: React.FC = () => {
  const { data: session } = useSession();

  const getInitials = (name?: string | null) => {
    if (!name) return "DW";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between px-6 sm:px-8 bg-[#f8fafc]/90 backdrop-blur-md border-b border-slate-100/60">
      {/* Top Search Bar (Donezo style) */}
      <div className="flex items-center gap-3 w-full max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-4 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari pesanan, kamar, atau tamu..."
            className="w-full rounded-full bg-white px-11 py-2.5 text-xs font-medium text-slate-800 shadow-xs border border-slate-200/80 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/30"
          />
        </div>
      </div>

      {/* Profile Chip & Exit */}
      {session?.user && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-white px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-xs">
            <div className="h-8 w-8 rounded-full bg-[#0F3D91] text-white font-bold text-xs flex items-center justify-center shadow-xs">
              {getInitials(session.user.name)}
            </div>
            <div className="hidden sm:flex flex-col text-left pr-1">
              <span className="text-xs font-extrabold text-slate-900 leading-none">
                {session.user.name}
              </span>
              <span className="text-[10px] text-[#1A73E8] font-bold mt-0.5">
                {session.user.role === "SUPER_ADMIN"
                  ? "Super Admin"
                  : session.user.role === "ADMIN"
                  ? "Staf Hotel"
                  : `Kamar ${session.user.roomNumber || ""}`}
              </span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="rounded-full text-slate-500 hover:text-rose-600 hover:bg-white border border-transparent hover:border-slate-200"
            title="Keluar"
          >
            <LogOut className="h-4 w-4 sm:mr-1.5" />
            <span className="hidden sm:inline">Keluar</span>
          </Button>
        </div>
      )}
    </header>
  );
};
