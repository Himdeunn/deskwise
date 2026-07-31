"use client";

import React, { useState } from "react";
import { useOrders, useUpdateOrderStatus } from "@/features/orders/hooks/useOrders";
import { OrderFilterBar } from "@/components/orders/OrderFilterBar";
import { OrderTable } from "@/components/orders/OrderTable";
import { Skeleton } from "@/components/ui/Skeleton";
import { AlertCircle, RefreshCw, ShoppingBag } from "lucide-react";

export default function StaffOrdersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [service, setService] = useState("ALL");

  const { data: orders = [], isLoading, isError, refetch } = useOrders(search, status, service);
  const updateStatusMutation = useUpdateOrderStatus();

  const handleUpdateStatus = async (orderId: string, newStatus: any) => {
    try {
      await updateStatusMutation.mutateAsync({ orderId, status: newStatus });
    } catch (err: any) {
      alert(err.message || "Gagal memperbarui status pesanan.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-[#0F3D91] tracking-tight">
              Daftar Request Layanan Tamu
            </h1>
            <span className="px-3 py-1 text-xs font-extrabold bg-[#f0f5ff] text-[#0F3D91] border border-[#BBD4FF]/60 rounded-full shadow-xs">
              {orders.length} pesanan
            </span>
          </div>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Kelola dan perbarui status permintaan kamar tamu hotel secara terpusat.
          </p>
        </div>

        <button
          onClick={() => refetch()}
          className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 bg-white border border-slate-200/80 rounded-full text-slate-700 hover:bg-slate-50 transition-all shadow-xs self-start sm:self-auto"
        >
          <RefreshCw className="h-3.5 w-3.5 text-[#1A73E8]" />
          Perbarui Data
        </button>
      </div>

      {/* Filter Bar */}
      <OrderFilterBar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        service={service}
        setService={setService}
      />

      {/* Main Table Content */}
      {isError ? (
        <div className="p-6 rounded-3xl bg-rose-50 border border-rose-200 text-center text-rose-700 text-xs font-semibold space-y-2">
          <AlertCircle className="h-6 w-6 mx-auto text-rose-500" />
          <p>Gagal mengambil data pesanan. Silakan coba lagi.</p>
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
  );
}
