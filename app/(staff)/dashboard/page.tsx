"use client";

import React, { useState } from "react";
import { useOrders, useUpdateOrderStatus } from "@/features/orders/hooks/useOrders";
import { computeMetrics } from "@/features/orders/utils/computeMetrics";
import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics";
import { TopServicesList } from "@/components/dashboard/TopServicesList";
import { OrderFilterBar } from "@/components/orders/OrderFilterBar";
import { OrderTable } from "@/components/orders/OrderTable";
import { Skeleton } from "@/components/ui/Skeleton";
import { AlertCircle, RefreshCw } from "lucide-react";

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
      alert(err.message || "Gagal mengupdate status pesanan.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Dashboard Operasional Staf
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Pantau dan kelola permintaan layanan tamu hotel secara terpusat & real-time.
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors self-start sm:self-auto shadow-xs"
        >
          <RefreshCw className="h-3.5 w-3.5 text-sky-600" />
          Refresh Data
        </button>
      </div>

      {/* Metrics Section */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <DashboardMetrics metrics={metrics} />
      )}

      {/* Top Services & Quick Stats */}
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
          <h2 className="text-lg font-bold text-slate-900">Daftar Order Layanan</h2>
          <span className="text-xs text-slate-500 font-medium">
            Total: {orders.length} pesanan
          </span>
        </div>

        {isError ? (
          <div className="p-6 rounded-xl bg-rose-50 border border-rose-200 text-center text-rose-700 text-sm space-y-2">
            <AlertCircle className="h-6 w-6 mx-auto text-rose-500" />
            <p>Terjadi kesalahan saat memuat data pesanan dari server.</p>
            <button
              onClick={() => refetch()}
              className="text-xs font-bold text-rose-800 underline hover:no-underline"
            >
              Coba Lagi
            </button>
          </div>
        ) : isLoading ? (
          <Skeleton className="h-64 w-full rounded-xl" />
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
