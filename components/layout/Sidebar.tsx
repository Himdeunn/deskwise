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
  ShieldAlert,
} from "lucide-react";

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role;

  const isStaff = role === "SUPER_ADMIN" || role === "ADMIN";
  const isSuperAdmin = role === "SUPER_ADMIN";

  const staffNav = [
    {
      name: "Dashboard Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
  ];

  if (isSuperAdmin) {
    staffNav.push({
      name: "Manajemen Admin",
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
      name: "Request Layanan Baru",
      href: "/my-orders/new",
      icon: PlusCircle,
    },
  ];

  const items = isStaff ? staffNav : customerNav;

  return (
    <aside className="w-full md:w-64 shrink-0 bg-white border-r border-slate-200/80 p-4 min-h-[calc(100vh-4rem)]">
      <div className="space-y-1">
        <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
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
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sky-50 text-sky-700 font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon className={clsx("h-4 w-4", isActive ? "text-sky-600" : "text-slate-400")} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};
