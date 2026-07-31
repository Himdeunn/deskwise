"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { OrderTable } from "@/components/orders/OrderTable";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { PlusCircle, CheckCircle2, AlertCircle } from "lucide-react";

function MyOrdersContent() {
  const searchParams = useSearchParams();
  const createdSuccess = searchParams.get("created") === "true";
  const { data: orders = [], isLoading, isError } = useOrders();

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Success Banner */}
      {createdSuccess && (
        <div className="flex items-start sm:items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />
          <span>Permintaan layanan Anda berhasil dikirim. Staf hotel akan segera memprosesnya!</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F3D91] tracking-tight">
            Pesanan Layanan Saya
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Pantau status dan riwayat permintaan layanan kamar Anda.
          </p>
        </div>
        <Link href="/my-orders/new" className="self-start sm:self-auto">
          <Button className="w-full sm:w-auto rounded-full font-extrabold text-xs px-5 py-2.5">
            <PlusCircle className="w-4 h-4 mr-2 shrink-0" />
            Request Baru
          </Button>
        </Link>
      </div>

      {/* Order List */}
      {isLoading ? (
        <Skeleton className="h-64 w-full rounded-3xl" />
      ) : isError ? (
        <div className="p-6 text-center rounded-3xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-semibold space-y-2">
          <AlertCircle className="h-5 w-5 mx-auto text-rose-500" />
          <p>Gagal memuat riwayat pesanan. Coba muat ulang halaman ini.</p>
        </div>
      ) : (
        <OrderTable orders={orders} isStaff={false} />
      )}
    </div>
  );
}

export default function MyOrdersPage() {
  return (
    <Suspense fallback={<Skeleton className="h-96 w-full rounded-3xl" />}>
      <MyOrdersContent />
    </Suspense>
  );
}
