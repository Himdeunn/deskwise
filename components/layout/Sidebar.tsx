"use client";

import React, { useState, useEffect } from "react";
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
  X,
  Menu,
} from "lucide-react";

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  mobileOpen = false,
  onMobileClose,
}) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role;

  const isStaff = role === "SUPER_ADMIN" || role === "ADMIN";
  const isSuperAdmin = role === "SUPER_ADMIN";

  useEffect(() => {
    if (onMobileClose) onMobileClose();
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const staffNav = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Service Requests", href: "/dashboard/orders", icon: ListOrdered },
  ];

  if (isSuperAdmin) {
    staffNav.push({ name: "Admin Team", href: "/dashboard/admin-management", icon: Users });
  }

  staffNav.push({ name: "Profile & Settings", href: "/profile", icon: Settings });

  const customerNav = [
    { name: "My Orders", href: "/my-orders", icon: ShoppingBag },
    { name: "New Request", href: "/my-orders/new", icon: PlusCircle },
    { name: "Profile & Settings", href: "/profile", icon: Settings },
  ];

  const items = isStaff ? staffNav : customerNav;

  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between">
      <div className="space-y-6">
        {/* Brand Logo */}
        <div className="flex items-center justify-between px-2 pt-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0F3D91] text-white shadow-md shadow-blue-900/20 shrink-0">
              <Hotel className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold tracking-tight text-[#0F3D91]">DeskWise</h2>
              <p className="text-[11px] text-slate-400 font-medium">Hotel Service</p>
            </div>
          </div>
          {onMobileClose && (
            <button
              onClick={onMobileClose}
              className="lg:hidden h-8 w-8 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <div className="space-y-1.5 pt-4">
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Navigation
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
                <Icon className={clsx("h-5 w-5 shrink-0", isActive ? "text-white" : "text-slate-400")} />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer Role Card */}
      <div className="p-4 rounded-2xl bg-[#f0f5ff] border border-[#BBD4FF]/50 space-y-1.5">
        <div className="flex items-center gap-2 text-[#1A73E8]">
          <Sparkles className="h-4 w-4 shrink-0" />
          <span className="text-xs font-bold uppercase tracking-wide">Account</span>
        </div>
        <p className="text-xs font-extrabold text-[#0F3D91]">
          {role === "SUPER_ADMIN" ? "Super Admin" : role === "ADMIN" ? "Hotel Staff" : "Room Guest"}
        </p>
        <p className="text-[11px] text-slate-500 font-medium truncate">
          {session?.user?.name || "DeskWise User"}
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 bg-white border-r border-slate-100 h-full overflow-y-auto p-5 z-20 flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={onMobileClose}
          />
          <aside className="absolute left-0 top-0 h-full w-72 max-w-[85vw] bg-white p-5 shadow-2xl overflow-y-auto z-50 flex flex-col">
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
};

export const MobileMenuButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="lg:hidden h-10 w-10 rounded-xl bg-white border border-slate-200/80 shadow-xs text-slate-600 flex items-center justify-center hover:bg-slate-50 transition-colors"
    aria-label="Open menu"
  >
    <Menu className="h-5 w-5" />
  </button>
);
