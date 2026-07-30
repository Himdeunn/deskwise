"use client";

import React from "react";
import { HotelOrder, OrderStatus } from "@/types/order";
import { Modal } from "@/components/ui/Modal";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { PaymentStatusBadge } from "./PaymentStatusBadge";
import { SlaBadge } from "./SlaBadge";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, RefreshCw, XCircle, UserCheck } from "lucide-react";

interface OrderDetailDrawerProps {
  order: HotelOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
  isUpdating: boolean;
  isStaff: boolean;
}

export const OrderDetailDrawer: React.FC<OrderDetailDrawerProps> = ({
  order,
  isOpen,
  onClose,
  onUpdateStatus,
  isUpdating,
  isStaff,
}) => {
  if (!order) return null;

  const formatIDR = (val: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Detail Pesanan #${order.id.slice(-6)}`}>
      <div className="space-y-5 text-sm">
        {/* Info Tamu & Kamar */}
        <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/60">
          <div>
            <p className="text-xs text-slate-500 font-medium">Tamu Pemesan</p>
            <p className="font-bold text-slate-900">{order.guest.name}</p>
            <p className="text-xs text-slate-500">{order.guest.email}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 font-medium">Nomor Kamar</p>
            <span className="inline-block px-2.5 py-1 text-sm font-bold bg-sky-100 text-sky-800 rounded-lg">
              Kamar {order.roomNumber}
            </span>
          </div>
        </div>

        {/* Layanan & Status Badges */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Jenis Layanan</span>
            <span className="font-semibold text-slate-900">{order.service}</span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Jumlah / Quantity</span>
            <span className="font-semibold text-slate-900">{order.quantity} pax</span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Total Biaya</span>
            <span className="font-bold text-sky-600 text-base">{formatIDR(order.amount)}</span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Status Pembayaran</span>
            <PaymentStatusBadge status={order.paymentStatus} />
          </div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Status Pesanan</span>
            <div className="flex items-center gap-2">
              <OrderStatusBadge status={order.status} />
              <SlaBadge createdAt={order.createdAt} status={order.status} />
            </div>
          </div>
          {order.handledBy && (
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Diproses Oleh Staf</span>
              <span className="font-medium text-slate-700">{order.handledBy.name}</span>
            </div>
          )}
        </div>

        {/* Catatan Khusus */}
        {order.specialRequest && (
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-600">Catatan / Permintaan Khusus:</p>
            <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-lg text-slate-700 italic text-xs">
              &quot;{order.specialRequest}&quot;
            </div>
          </div>
        )}

        {/* Waktu Pemesanan */}
        <div className="text-xs text-slate-400">
          Dibuat pada: {new Date(order.createdAt).toLocaleString("id-ID")}
        </div>

        {/* Tombol Aksi Staf */}
        {isStaff && order.status !== "Completed" && order.status !== "Cancelled" && (
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <p className="text-xs font-semibold text-slate-700">Ubah Status Pesanan:</p>
            <div className="grid grid-cols-2 gap-2">
              {order.status === "New" && (
                <Button
                  size="sm"
                  variant="outline"
                  isLoading={isUpdating}
                  onClick={() => onUpdateStatus(order.id, "Acknowledged")}
                  className="w-full text-amber-700 border-amber-300 hover:bg-amber-50"
                >
                  <UserCheck className="w-3.5 h-3.5 mr-1" />
                  Acknowledge
                </Button>
              )}
              {(order.status === "New" || order.status === "Acknowledged") && (
                <Button
                  size="sm"
                  variant="outline"
                  isLoading={isUpdating}
                  onClick={() => onUpdateStatus(order.id, "InProgress")}
                  className="w-full text-purple-700 border-purple-300 hover:bg-purple-50"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1" />
                  In Progress
                </Button>
              )}
              {order.status === "InProgress" && (
                <Button
                  size="sm"
                  variant="primary"
                  isLoading={isUpdating}
                  onClick={() => onUpdateStatus(order.id, "Completed")}
                  className="w-full col-span-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Tandai Selesai (Completed)
                </Button>
              )}
              <Button
                size="sm"
                variant="danger"
                isLoading={isUpdating}
                onClick={() => onUpdateStatus(order.id, "Cancelled")}
                className="w-full col-span-2"
              >
                <XCircle className="w-3.5 h-3.5 mr-1" />
                Batalkan Pesanan
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
