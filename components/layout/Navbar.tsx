"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import { LogOut, Search } from "lucide-react";
import { MobileMenuButton } from "./Sidebar";

interface NavbarProps {
  onMobileMenuOpen?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMobileMenuOpen }) => {
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
    <header className="sticky top-0 z-30 flex h-16 sm:h-20 w-full items-center justify-between px-4 sm:px-6 lg:px-8 bg-[#f8fafc]/90 backdrop-blur-md border-b border-slate-100/60 gap-3">
      {/* Left: Mobile Hamburger + Search */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Hamburger trigger – only shows on mobile/tablet */}
        <MobileMenuButton onClick={onMobileMenuOpen || (() => {})} />

        {/* Search Bar */}
        <div className="relative w-full max-w-xs sm:max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari pesanan atau kamar..."
            className="w-full rounded-full bg-white px-10 py-2 text-xs font-medium text-slate-800 shadow-xs border border-slate-200/80 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/30 transition"
          />
        </div>
      </div>

      {/* Right: Profile Chip & Logout */}
      {session?.user && (
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 bg-white px-2.5 sm:px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-xs">
            <div className="h-8 w-8 rounded-full bg-[#0F3D91] text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
              {getInitials(session.user.name)}
            </div>
            <div className="hidden sm:flex flex-col text-left pr-1">
              <span className="text-xs font-extrabold text-slate-900 leading-none max-w-[120px] truncate">
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

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="h-9 w-9 sm:w-auto sm:px-3 rounded-full text-slate-500 hover:text-rose-600 hover:bg-white border border-transparent hover:border-slate-200 flex items-center justify-center gap-1.5 transition-all text-xs font-bold"
            title="Keluar"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      )}
    </header>
  );
};
