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
  Settings,
  ListOrdered,
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
    {
      name: "Daftar Request",
      href: "/dashboard/orders",
      icon: ListOrdered,
    },
  ];

  if (isSuperAdmin) {
    staffNav.push({
      name: "Tim Admin",
      href: "/dashboard/admin-management",
      icon: Users,
    });
  }

  staffNav.push({
    name: "Profil & Pengaturan",
    href: "/profile",
    icon: Settings,
  });

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
    {
      name: "Profil & Pengaturan",
      href: "/profile",
      icon: Settings,
    },
  ];

  const items = isStaff ? staffNav : customerNav;

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-100 sticky top-0 h-screen overflow-y-auto p-5 flex flex-col justify-between z-20">
      <div className="space-y-6">
        {/* Brand Logo Header */}
        <div className="flex items-center gap-3 px-2 pt-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0F3D91] text-white shadow-md shadow-blue-900/20">
            <Hotel className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold tracking-tight text-[#0F3D91]">DeskWise</h2>
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
                  "flex items-center gap-3.5 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "bg-[#0F3D91] text-white shadow-md shadow-blue-900/15"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <Icon
                  className={clsx(
                    "h-5 w-5 transition-transform",
                    isActive ? "text-white" : "text-slate-400"
                  )}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer Role Card */}
      <div className="p-4 rounded-2xl bg-[#f0f5ff] border border-[#BBD4FF]/50 space-y-1.5">
        <div className="flex items-center gap-2 text-[#1A73E8]">
          <Sparkles className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-wide">Pengguna</span>
        </div>
        <p className="text-xs font-extrabold text-[#0F3D91]">
          {role === "SUPER_ADMIN" ? "Super Admin" : role === "ADMIN" ? "Staf Hotel" : "Tamu Kamar"}
        </p>
        <p className="text-[11px] text-slate-500 font-medium truncate">
          {session?.user?.name || "Pengguna DeskWise"}
        </p>
      </div>
    </aside>
  );
};
