"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import { LogOut } from "lucide-react";
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
    <header className="shrink-0 flex h-16 sm:h-20 w-full items-center justify-between px-4 sm:px-6 lg:px-8 bg-[#f8fafc]/90 backdrop-blur-md border-b border-slate-100/60 gap-3 z-30">
      {/* Left: Mobile Hamburger */}
      <div className="flex items-center gap-3">
        <MobileMenuButton onClick={onMobileMenuOpen || (() => {})} />
      </div>

      {/* Right: Profile Chip & Sign Out */}
      {session?.user && (
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 bg-white px-2.5 sm:px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-xs">
            <div className="h-8 w-8 rounded-full bg-[#0F3D91] text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
              {getInitials(session.user.name)}
            </div>
            <div className="hidden sm:flex flex-col text-left pr-1">
              <span className="text-xs font-extrabold text-slate-900 leading-none max-w-[140px] truncate">
                {session.user.name}
              </span>
              <span className="text-[10px] text-[#1A73E8] font-bold mt-0.5">
                {session.user.role === "SUPER_ADMIN"
                  ? "Super Admin"
                  : session.user.role === "ADMIN"
                  ? "Hotel Staff"
                  : `Room ${session.user.roomNumber || ""}`}
              </span>
            </div>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="h-9 w-9 sm:w-auto sm:px-3 rounded-full text-slate-500 hover:text-rose-600 hover:bg-white border border-transparent hover:border-slate-200 flex items-center justify-center gap-1.5 transition-all text-xs font-bold"
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      )}
    </header>
  );
};
