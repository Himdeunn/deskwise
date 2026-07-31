"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useOrders, useUpdateOrderStatus } from "@/features/orders/hooks/useOrders";
import { computeMetrics } from "@/features/orders/utils/computeMetrics";
import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics";
import { TopServicesList } from "@/components/dashboard/TopServicesList";
import { OrderFilterBar } from "@/components/orders/OrderFilterBar";
import { OrderTable } from "@/components/orders/OrderTable";
import { Skeleton } from "@/components/ui/Skeleton";
import { AlertCircle, RefreshCw, Plus } from "lucide-react";

export default function DashboardOverviewPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [service, setService] = useState("ALL");

  const { data: orders = [], isLoading, isError, refetch } = useOrders(search, status, service);
  const updateStatusMutation = useUpdateOrderStatus();

  const { metrics, topServices } = computeMetrics(orders);

  const handleUpdateStatus = async (orderId: string, newStatus: any) => {
    try {
      await updateStatusMutation.mutateAsync({ orderId, status: newStatus });
    } catch (err: any) {
      alert(err.message || "Gagal memperbarui status pesanan.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section (Donezo style) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Ringkasan data dan kelola permintaan kamar tamu hotel
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

          <Link
            href="/my-orders/new"
            className="inline-flex items-center gap-2 text-xs font-extrabold px-5 py-2.5 bg-[#0F3D91] hover:bg-[#1A73E8] text-white rounded-full shadow-md shadow-blue-900/15 transition-all"
          >
            <Plus className="h-4 w-4" />
            Request Baru
          </Link>
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

      {/* Analytics & Top Services Section */}
      {!isLoading && topServices.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <OrderFilterBar
              search={search}
              setSearch={setSearch}
              status={status}
              setStatus={setStatus}
              service={service}
              setService={setService}
            />
          </div>
          <div>
            <TopServicesList stats={topServices} />
          </div>
        </div>
      )}

      {/* Order Table Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-[#0F3D91]">Daftar Request Tamu</h2>
          <span className="text-xs text-[#0F3D91] font-extrabold px-3 py-1 bg-[#f0f5ff] border border-[#BBD4FF]/60 rounded-full shadow-xs">
            {orders.length} pesanan
          </span>
        </div>

        {isError ? (
          <div className="p-6 rounded-3xl bg-rose-50 border border-rose-200 text-center text-rose-700 text-xs font-semibold space-y-2">
            <AlertCircle className="h-6 w-6 mx-auto text-rose-500" />
            <p>Gagal mengambil data pesanan. Silakan periksa koneksi Anda.</p>
            <button
              onClick={() => refetch()}
              className="text-xs font-bold text-rose-800 underline hover:no-underline"
            >
              Coba Lagi
            </button>
          </div>
        ) : isLoading ? (
          <Skeleton className="h-64 w-full rounded-3xl" />
        ) : (
          <OrderTable
            orders={orders}
            isStaff={true}
            onUpdateStatus={handleUpdateStatus}
            isUpdating={updateStatusMutation.isPending}
          />
        )}
      </div>
    </div>
  );
}
