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
  const { data: orders = [], isLoading, isError, refetch } = useOrders();

  const { metrics, topServices } = computeMetrics(orders);

  // Pick top 5 recent orders or SLA breach orders for the summary preview
  const urgentOrders = orders
    .filter((o) => o.status === "New" || o.status === "Acknowledged")
    .slice(0, 5);

  const formatIDR = (val: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Ringkasan data dan analitik operasional kamar tamu hotel
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 bg-white border border-slate-200/80 rounded-full text-slate-700 hover:bg-slate-50 transition-all shadow-xs"
          >
            <RefreshCw className="h-3.5 w-3.5 text-[#1A73E8]" />
            Perbarui Data
          </button>
        </div>
      </div>

      {/* 4 Donezo-style Top Metric Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-3xl" />
          ))}
        </div>
      ) : (
        <DashboardMetrics metrics={metrics} />
      )}

      {/* Analytics & Summary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Urgent Orders Preview Card */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#0F3D91]">Request Perlu Penanganan</h3>
                <p className="text-xs text-slate-500 font-medium">Ringkasan pesanan baru & SLA breach</p>
              </div>
            </div>

            <Link
              href="/dashboard/orders"
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#1A73E8] hover:underline"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {isLoading ? (
            <Skeleton className="h-40 w-full rounded-2xl" />
          ) : urgentOrders.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500 font-medium bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              Tidak ada pesanan baru yang membutuhkan penanganan saat ini.
            </div>
          ) : (
            <div className="space-y-2.5">
              {urgentOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="flex items-center justify-between p-3.5 bg-[#f8fafc] rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xs transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 text-xs font-extrabold bg-[#f0f5ff] text-[#0F3D91] rounded-full">
                      Kamar {ord.roomNumber}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{ord.service} ({ord.quantity}x)</p>
                      <p className="text-[11px] text-slate-500">{ord.guest.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <OrderStatusBadge status={ord.status} />
                    <SlaBadge createdAt={ord.createdAt} status={ord.status} />
                    <span className="text-xs font-extrabold text-[#0F3D91] ml-2">{formatIDR(ord.amount)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Demands Chart */}
        <div>
          {isLoading ? (
            <Skeleton className="h-64 w-full rounded-3xl" />
          ) : (
            <TopServicesList stats={topServices} />
          )}
        </div>
      </div>
    </div>
  );
}
