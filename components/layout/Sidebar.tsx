"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { clsx } from "clsx";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  PlusCircle,
  Hotel,
  Shield,
  Sparkles,
} from "lucide-react";

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role;

  const isStaff = role === "SUPER_ADMIN" || role === "ADMIN";
  const isSuperAdmin = role === "SUPER_ADMIN";

  const staffNav = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
  ];

  if (isSuperAdmin) {
    staffNav.push({
      name: "Tim Admin",
      href: "/dashboard/admin-management",
      icon: Users,
    });
  }

  const customerNav = [
    {
      name: "Pesanan Saya",
      href: "/my-orders",
      icon: ShoppingBag,
    },
    {
      name: "Request Baru",
      href: "/my-orders/new",
      icon: PlusCircle,
    },
  ];

  const items = isStaff ? staffNav : customerNav;

  return (
    <aside className="w-full md:w-64 shrink-0 p-3 sm:p-4">
      <div className="bg-[#181825] text-white rounded-3xl p-5 shadow-xl min-h-[calc(100vh-2rem)] flex flex-col justify-between">
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="flex items-center gap-3 px-2 pt-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/30">
              <Hotel className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold tracking-tight text-white">DeskWise</h2>
              <p className="text-[11px] text-slate-400 font-medium">Hotel Service</p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="space-y-1.5 pt-4">
            <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Menu Utama
            </div>
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200",
                    isActive
                      ? "bg-white text-slate-900 shadow-lg shadow-black/10 scale-[1.02]"
                      : "text-slate-300 hover:bg-[#252538] hover:text-white"
                  )}
                >
                  <Icon
                    className={clsx(
                      "h-5 w-5 transition-transform",
                      isActive ? "text-violet-600" : "text-slate-400"
                    )}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer Card */}
        <div className="mt-8 p-4 rounded-2xl bg-[#232336] border border-[#2e2e46] space-y-2">
          <div className="flex items-center gap-2 text-violet-400">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-wide">Akses Peran</span>
          </div>
          <p className="text-xs font-semibold text-white">
            {role === "SUPER_ADMIN" ? "Super Admin" : role === "ADMIN" ? "Staf Hotel" : "Tamu Kamar"}
          </p>

          <p className="text-[11px] text-slate-400 leading-snug">
            {session?.user?.name || "Pengguna DeskWise"}
          </p>
        </div>
      </div>
    </aside>
  );
};
