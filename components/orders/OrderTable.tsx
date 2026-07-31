"use client";

import React, { useState } from "react";
import { HotelOrder, OrderStatus } from "@/types/order";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { PaymentStatusBadge } from "./PaymentStatusBadge";
import { SlaBadge } from "./SlaBadge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { OrderDetailDrawer } from "./OrderDetailDrawer";
import { Eye, UserCheck, RefreshCw, CheckCircle2 } from "lucide-react";

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
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);

  if (orders.length === 0) {
    return <EmptyState title="Belum Ada Pesanan" description="Tidak ada daftar pesanan yang cocok dengan pilihan pencarian Anda." />;
  }

  const handleUpdate = (orderId: string, newStatus: OrderStatus) => {
    if (onUpdateStatus) {
      onUpdateStatus(orderId, newStatus);
      setSelectedOrder(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto rounded-3xl border border-slate-100 bg-white shadow-xs">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50/80 text-[11px] uppercase font-bold text-slate-400 border-b border-slate-100 tracking-wider">
            <tr>
              <th className="px-6 py-4">Kamar</th>
              <th className="px-6 py-4">Nama Tamu</th>
              <th className="px-6 py-4">Layanan</th>
              <th className="px-6 py-4">Biaya</th>
              <th className="px-6 py-4">Status Pesanan</th>
              <th className="px-6 py-4">Pembayaran</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {orders.map((ord) => (
              <tr key={ord.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-6 py-4 font-extrabold text-slate-900">
                  <span className="inline-block px-3 py-1 bg-[#f0f5ff] text-[#0F3D91] border border-[#BBD4FF]/60 rounded-full font-extrabold text-xs">
                    Kamar {ord.roomNumber}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="font-extrabold text-slate-900 text-sm">{ord.guest.name}</div>
                  <div className="text-[11px] text-slate-400 font-semibold">#{ord.id.slice(-5)}</div>
                </td>
                <td className="px-6 py-4 font-bold text-slate-800">
                  {ord.service} ({ord.quantity}x)
                </td>
                <td className="px-6 py-4 font-extrabold text-[#0F3D91]">
                  {formatIDR(ord.amount)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <OrderStatusBadge status={ord.status} />
                    <SlaBadge createdAt={ord.createdAt} status={ord.status} />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <PaymentStatusBadge status={ord.paymentStatus} />
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  {isStaff && ord.status === "New" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs py-1 px-3 rounded-full border-amber-300 text-amber-700 hover:bg-amber-50 font-bold"
                      onClick={() => handleUpdate(ord.id, "Acknowledged")}
                    >
                      <UserCheck className="w-3 h-3 mr-1" />
                      Terima
                    </Button>
                  )}
                  {isStaff && ord.status === "Acknowledged" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs py-1 px-3 rounded-full border-violet-300 text-violet-700 hover:bg-violet-50 font-bold"
                      onClick={() => handleUpdate(ord.id, "InProgress")}
                    >
                      <RefreshCw className="w-3 h-3 mr-1" />
                      Proses
                    </Button>
                  )}
                  {isStaff && ord.status === "InProgress" && (
                    <Button
                      size="sm"
                      variant="primary"
                      className="text-xs py-1 px-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                      onClick={() => handleUpdate(ord.id, "Completed")}
                    >
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Selesai
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs py-1 px-2.5 rounded-full"
                    onClick={() => setSelectedOrder(ord)}
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List */}
      <div className="md:hidden space-y-3">
        {orders.map((ord) => (
          <div
            key={ord.id}
            className="p-5 bg-white rounded-3xl border border-slate-100 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 text-xs font-extrabold bg-[#f0f5ff] text-[#0F3D91] rounded-full">
                Kamar {ord.roomNumber}
              </span>
              <div className="flex items-center gap-1.5">
                <OrderStatusBadge status={ord.status} />
                <SlaBadge createdAt={ord.createdAt} status={ord.status} />
              </div>
            </div>

            <div className="flex justify-between items-start pt-1">
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">{ord.service} ({ord.quantity} pax)</h4>
                <p className="text-xs text-slate-500 font-semibold">Pemesan: {ord.guest.name}</p>
              </div>
              <p className="font-extrabold text-[#0F3D91] text-sm">{formatIDR(ord.amount)}</p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <PaymentStatusBadge status={ord.paymentStatus} />
              <Button size="sm" variant="outline" className="rounded-full font-bold" onClick={() => setSelectedOrder(ord)}>
                <Eye className="w-3.5 h-3.5 mr-1" />
                Detail
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Drawer Detail */}
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
