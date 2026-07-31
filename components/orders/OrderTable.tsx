"use client";

import React, { useState } from "react";
import { HotelOrder, OrderStatus } from "@/types/order";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { PaymentStatusBadge } from "./PaymentStatusBadge";
import { SlaBadge } from "./SlaBadge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { OrderDetailDrawer } from "./OrderDetailDrawer";
import { Eye, UserCheck, RefreshCw, CheckCircle2, ChevronRight } from "lucide-react";

interface OrderTableProps {
  orders: HotelOrder[];
  isStaff?: boolean;
  onUpdateStatus?: (orderId: string, newStatus: OrderStatus) => void;
  isUpdating?: boolean;
}

export const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  isStaff = false,
  onUpdateStatus,
  isUpdating = false,
}) => {
  const [selectedOrder, setSelectedOrder] = useState<HotelOrder | null>(null);

  const formatIDR = (val: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);

  if (orders.length === 0) {
    return (
      <EmptyState
        title="Belum Ada Pesanan"
        description="Tidak ada pesanan yang cocok dengan filter yang dipilih."
      />
    );
  }

  const handleUpdate = (orderId: string, newStatus: OrderStatus) => {
    if (onUpdateStatus) {
      onUpdateStatus(orderId, newStatus);
      setSelectedOrder(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* ── Desktop / Tablet Table (≥768px) ── */}
      <div className="hidden md:block overflow-x-auto rounded-3xl border border-slate-100 bg-white shadow-xs">
        <table className="w-full min-w-[680px] text-left text-xs text-slate-600">
          <thead className="bg-slate-50/80 text-[11px] uppercase font-bold text-slate-400 border-b border-slate-100 tracking-wider">
            <tr>
              <th className="px-4 lg:px-6 py-4">Kamar</th>
              <th className="px-4 lg:px-6 py-4">Tamu</th>
              <th className="px-4 lg:px-6 py-4">Layanan</th>
              <th className="px-4 lg:px-6 py-4">Biaya</th>
              <th className="px-4 lg:px-6 py-4">Status</th>
              <th className="px-4 lg:px-6 py-4">Bayar</th>
              <th className="px-4 lg:px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {orders.map((ord) => (
              <tr key={ord.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-4 lg:px-6 py-4">
                  <span className="inline-block px-2.5 py-1 bg-[#f0f5ff] text-[#0F3D91] border border-[#BBD4FF]/60 rounded-full font-extrabold text-xs whitespace-nowrap">
                    K-{ord.roomNumber}
                  </span>
                </td>
                <td className="px-4 lg:px-6 py-4">
                  <div className="font-extrabold text-slate-900 text-xs truncate max-w-[100px]">{ord.guest.name}</div>
                  <div className="text-[11px] text-slate-400">#{ord.id.slice(-5)}</div>
                </td>
                <td className="px-4 lg:px-6 py-4 font-bold text-slate-800 whitespace-nowrap">
                  {ord.service} ({ord.quantity}×)
                </td>
                <td className="px-4 lg:px-6 py-4 font-extrabold text-[#0F3D91] whitespace-nowrap">
                  {formatIDR(ord.amount)}
                </td>
                <td className="px-4 lg:px-6 py-4">
                  <div className="flex flex-wrap items-center gap-1">
                    <OrderStatusBadge status={ord.status} />
                    <SlaBadge createdAt={ord.createdAt} status={ord.status} />
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-4">
                  <PaymentStatusBadge status={ord.paymentStatus} />
                </td>
                <td className="px-4 lg:px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1.5 flex-wrap">
                    {isStaff && ord.status === "New" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs py-1 px-2.5 rounded-full border-amber-300 text-amber-700 hover:bg-amber-50 font-bold whitespace-nowrap"
                        onClick={() => handleUpdate(ord.id, "Acknowledged")}
                      >
                        <UserCheck className="w-3 h-3 mr-1 shrink-0" />
                        Terima
                      </Button>
                    )}
                    {isStaff && ord.status === "Acknowledged" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs py-1 px-2.5 rounded-full border-violet-300 text-violet-700 hover:bg-violet-50 font-bold whitespace-nowrap"
                        onClick={() => handleUpdate(ord.id, "InProgress")}
                      >
                        <RefreshCw className="w-3 h-3 mr-1 shrink-0" />
                        Proses
                      </Button>
                    )}
                    {isStaff && ord.status === "InProgress" && (
                      <Button
                        size="sm"
                        variant="primary"
                        className="text-xs py-1 px-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold whitespace-nowrap"
                        onClick={() => handleUpdate(ord.id, "Completed")}
                      >
                        <CheckCircle2 className="w-3 h-3 mr-1 shrink-0" />
                        Selesai
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs p-1.5 rounded-full"
                      onClick={() => setSelectedOrder(ord)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Mobile Card List (<768px) ── */}
      <div className="md:hidden space-y-3">
        {orders.map((ord) => (
          <div
            key={ord.id}
            className="p-4 bg-white rounded-3xl border border-slate-100 shadow-xs space-y-3"
          >
            {/* Top row: Room badge + Statuses + Detail trigger */}
            <div className="flex items-start justify-between gap-2">
              <span className="px-2.5 py-1 text-xs font-extrabold bg-[#f0f5ff] text-[#0F3D91] rounded-full shrink-0">
                Kamar {ord.roomNumber}
              </span>
              <div className="flex items-center gap-1.5 flex-wrap justify-end">
                <OrderStatusBadge status={ord.status} />
                <SlaBadge createdAt={ord.createdAt} status={ord.status} />
              </div>
            </div>

            {/* Middle: Service info + price */}
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-extrabold text-slate-900 text-sm truncate">
                  {ord.service} <span className="font-bold text-slate-500">({ord.quantity}×)</span>
                </p>
                <p className="text-xs text-slate-500 font-semibold mt-0.5 truncate">{ord.guest.name}</p>
              </div>
              <p className="font-extrabold text-[#0F3D91] text-sm shrink-0">{formatIDR(ord.amount)}</p>
            </div>

            {/* Bottom row: Payment badge + Action buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-2 flex-wrap">
              <PaymentStatusBadge status={ord.paymentStatus} />
              <div className="flex items-center gap-2">
                {isStaff && ord.status === "New" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs py-1 px-2.5 rounded-full border-amber-300 text-amber-700 hover:bg-amber-50 font-bold"
                    onClick={() => handleUpdate(ord.id, "Acknowledged")}
                  >
                    <UserCheck className="w-3 h-3 mr-1" /> Terima
                  </Button>
                )}
                {isStaff && ord.status === "Acknowledged" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs py-1 px-2.5 rounded-full border-violet-300 text-violet-700 hover:bg-violet-50 font-bold"
                    onClick={() => handleUpdate(ord.id, "InProgress")}
                  >
                    <RefreshCw className="w-3 h-3 mr-1" /> Proses
                  </Button>
                )}
                {isStaff && ord.status === "InProgress" && (
                  <Button
                    size="sm"
                    variant="primary"
                    className="text-xs py-1 px-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                    onClick={() => handleUpdate(ord.id, "Completed")}
                  >
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Selesai
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full font-bold text-xs py-1 px-2.5"
                  onClick={() => setSelectedOrder(ord)}
                >
                  <Eye className="w-3.5 h-3.5 mr-1" />
                  Detail
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Drawer Modal */}
      <OrderDetailDrawer
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onUpdateStatus={handleUpdate}
        isUpdating={isUpdating}
        isStaff={isStaff}
      />
    </div>
  );
};
