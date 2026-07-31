"use client";

import React from "react";
import Link from "next/link";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { computeMetrics } from "@/features/orders/utils/computeMetrics";
import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics";
import { TopServicesList } from "@/components/dashboard/TopServicesList";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";
import { SlaBadge } from "@/components/orders/SlaBadge";
import { Skeleton } from "@/components/ui/Skeleton";
import { RefreshCw, ArrowRight, ShieldAlert } from "lucide-react";

export default function DashboardOverviewPage() {
  const { data: orders = [], isLoading, refetch } = useOrders();
  const { metrics, topServices } = computeMetrics(orders);

  const urgentOrders = orders
    .filter((o) => o.status === "New" || o.status === "Acknowledged")
    .slice(0, 5);

  const formatIDR = (val: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Operational overview and analytics for hotel guest services
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 bg-white border border-slate-200/80 rounded-full text-slate-700 hover:bg-slate-50 transition-all shadow-xs self-start sm:self-auto"
        >
          <RefreshCw className="h-3.5 w-3.5 text-[#1A73E8]" />
          Refresh Data
        </button>
      </div>

      {/* Metric Cards */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-3xl" />
          ))}
        </div>
      ) : (
        <DashboardMetrics metrics={metrics} />
      )}

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Urgent Orders Preview */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-9 w-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-extrabold text-[#0F3D91] truncate">Orders Needing Attention</h3>
                <p className="text-[11px] text-slate-500 font-medium">New & SLA breach orders</p>
              </div>
            </div>
            <Link
              href="/dashboard/orders"
              className="inline-flex items-center gap-1 text-xs font-extrabold text-[#1A73E8] hover:underline shrink-0"
            >
              <span className="hidden xs:inline">View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {isLoading ? (
            <Skeleton className="h-40 w-full rounded-2xl" />
          ) : urgentOrders.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500 font-medium bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              No pending orders require attention right now.
            </div>
          ) : (
            <div className="space-y-2">
              {urgentOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="flex items-center justify-between p-3 sm:p-3.5 bg-[#f8fafc] rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xs transition-all gap-2"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="px-2.5 py-1 text-[10px] font-extrabold bg-[#f0f5ff] text-[#0F3D91] rounded-full shrink-0">
                      Rm-{ord.roomNumber}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {ord.service} ({ord.quantity}×)
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">{ord.guest.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
                    <OrderStatusBadge status={ord.status} />
                    <SlaBadge createdAt={ord.createdAt} status={ord.status} />
                    <span className="text-xs font-extrabold text-[#0F3D91] hidden sm:inline">
                      {formatIDR(ord.amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Services Chart */}
        <div className="min-h-[200px]">
          {isLoading ? (
            <Skeleton className="h-full min-h-[200px] w-full rounded-3xl" />
          ) : (
            <TopServicesList stats={topServices} />
          )}
        </div>
      </div>
    </div>
  );
}
