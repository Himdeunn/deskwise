"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import { Hotel, LogOut, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const Navbar: React.FC = () => {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 sm:px-6 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600 text-white shadow-xs">
          <Hotel className="h-5 w-5" />
        </div>
        <div>
          <span className="text-base font-bold text-slate-900 tracking-tight">DeskWise</span>
          <span className="ml-2 hidden sm:inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
            v1.0
          </span>
        </div>
      </div>

      {session?.user && (
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm font-semibold text-slate-800">
              {session.user.name}
            </span>
            <div className="flex items-center justify-end gap-1 text-xs text-slate-500">
              <Shield className="h-3 w-3 text-sky-600" />
              <span>{session.user.role}</span>
              {session.user.roomNumber && (
                <span className="ml-1 text-slate-400">• Kamar {session.user.roomNumber}</span>
              )}
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-slate-600 hover:text-rose-600"
            title="Keluar Akun"
          >
            <LogOut className="h-4 w-4 sm:mr-1.5" />
            <span className="hidden sm:inline">Keluar</span>
          </Button>
        </div>
      )}
    </header>
  );
};
