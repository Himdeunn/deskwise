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
    return <EmptyState title="Tidak Ada Pesanan" description="Tidak ditemukan pesanan layanan hotel pada kategori ini." />;
  }

  const handleUpdate = (orderId: string, newStatus: OrderStatus) => {
    if (onUpdateStatus) {
      onUpdateStatus(orderId, newStatus);
      setSelectedOrder(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Tampilan Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200/80 bg-white shadow-xs">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50/80 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200/80">
            <tr>
              <th className="px-4 py-3.5">No. Kamar</th>
              <th className="px-4 py-3.5">Tamu Pemesan</th>
              <th className="px-4 py-3.5">Layanan</th>
              <th className="px-4 py-3.5">Total Biaya</th>
              <th className="px-4 py-3.5">Status Pesanan</th>
              <th className="px-4 py-3.5">Pembayaran</th>
              <th className="px-4 py-3.5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((ord) => (
              <tr key={ord.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-4 py-3 font-bold text-slate-900">
                  <span className="inline-block px-2 py-0.5 bg-sky-50 text-sky-700 rounded-md">
                    {ord.roomNumber}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-900">{ord.guest.name}</div>
                  <div className="text-xs text-slate-400">ID: #{ord.id.slice(-5)}</div>
                </td>
                <td className="px-4 py-3 font-medium text-slate-800">
                  {ord.service} ({ord.quantity}x)
                </td>
                <td className="px-4 py-3 font-semibold text-slate-900">
                  {formatIDR(ord.amount)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <OrderStatusBadge status={ord.status} />
                    <SlaBadge createdAt={ord.createdAt} status={ord.status} />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <PaymentStatusBadge status={ord.paymentStatus} />
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  {isStaff && ord.status === "New" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs py-1 px-2 border-amber-300 text-amber-700 hover:bg-amber-50"
                      onClick={() => handleUpdate(ord.id, "Acknowledged")}
                    >
                      <UserCheck className="w-3 h-3 mr-1" />
                      Ack
                    </Button>
                  )}
                  {isStaff && ord.status === "Acknowledged" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs py-1 px-2 border-purple-300 text-purple-700 hover:bg-purple-50"
                      onClick={() => handleUpdate(ord.id, "InProgress")}
                    >
                      <RefreshCw className="w-3 h-3 mr-1" />
                      Process
                    </Button>
                  )}
                  {isStaff && ord.status === "InProgress" && (
                    <Button
                      size="sm"
                      variant="primary"
                      className="text-xs py-1 px-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                      onClick={() => handleUpdate(ord.id, "Completed")}
                    >
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Done
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs py-1 px-2"
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

      {/* Tampilan Mobile Card List */}
      <div className="md:hidden space-y-3">
        {orders.map((ord) => (
          <div
            key={ord.id}
            className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 text-xs font-bold bg-sky-100 text-sky-800 rounded-lg">
                Kamar {ord.roomNumber}
              </span>
              <div className="flex items-center gap-1.5">
                <OrderStatusBadge status={ord.status} />
                <SlaBadge createdAt={ord.createdAt} status={ord.status} />
              </div>
            </div>

            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-slate-900">{ord.service} ({ord.quantity} pax)</h4>
                <p className="text-xs text-slate-500">Pemesan: {ord.guest.name}</p>
              </div>
              <p className="font-bold text-sky-600 text-sm">{formatIDR(ord.amount)}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <PaymentStatusBadge status={ord.paymentStatus} />
              <Button size="sm" variant="outline" onClick={() => setSelectedOrder(ord)}>
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
