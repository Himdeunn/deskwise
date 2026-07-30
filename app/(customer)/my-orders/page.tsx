"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { OrderTable } from "@/components/orders/OrderTable";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { PlusCircle, CheckCircle2 } from "lucide-react";

export default function MyOrdersPage() {
  const searchParams = useSearchParams();
  const createdSuccess = searchParams.get("created") === "true";

  const { data: orders = [], isLoading, isError } = useOrders();

  return (
    <div className="space-y-6">
      {/* Success Notification */}
      {createdSuccess && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>Permintaan layanan Anda berhasil dikirim! Tim staf kami akan segera memprosesnya.</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Pesanan Layanan Saya
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Pantau status permintaan layanan kamar Anda secara real-time.
          </p>
        </div>

        <Link href="/my-orders/new">
          <Button className="w-full sm:w-auto">
            <PlusCircle className="w-4 h-4 mr-2" />
            Request Layanan Baru
          </Button>
        </Link>
      </div>

      {/* Orders List / Table */}
      {isLoading ? (
        <Skeleton className="h-64 w-full rounded-xl" />
      ) : isError ? (
        <div className="p-6 text-center text-rose-600 bg-rose-50 rounded-xl border border-rose-200">
          Gagal mengambil riwayat pesanan Anda.
        </div>
      ) : (
        <OrderTable orders={orders} isStaff={false} />
      )}
    </div>
  );
}
