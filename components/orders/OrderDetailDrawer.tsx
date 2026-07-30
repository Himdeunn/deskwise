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
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Pemesan</p>
            <p className="font-extrabold text-slate-900 text-base">{order.guest.name}</p>
            <p className="text-xs text-slate-500 font-medium">{order.guest.email}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Kamar</p>
            <span className="inline-block px-3 py-1 text-sm font-extrabold bg-violet-100 text-violet-800 rounded-full">
              Kamar {order.roomNumber}
            </span>
          </div>
        </div>

        {/* Layanan & Status */}
        <div className="space-y-3 font-medium">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500 text-xs">Jenis Layanan</span>
            <span className="font-bold text-slate-900">{order.service}</span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500 text-xs">Jumlah</span>
            <span className="font-bold text-slate-900">{order.quantity} pax</span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500 text-xs">Total Biaya</span>
            <span className="font-extrabold text-violet-600 text-base">{formatIDR(order.amount)}</span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500 text-xs">Pembayaran</span>
            <PaymentStatusBadge status={order.paymentStatus} />
          </div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500 text-xs">Status Pesanan</span>
            <div className="flex items-center gap-2">
              <OrderStatusBadge status={order.status} />
              <SlaBadge createdAt={order.createdAt} status={order.status} />
            </div>
          </div>
          {order.handledBy && (
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500 text-xs">Ditangani Oleh</span>
              <span className="font-bold text-slate-800">{order.handledBy.name}</span>
            </div>
          )}
        </div>

        {/* Catatan Khusus */}
        {order.specialRequest && (
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-600">Catatan Tamu:</p>
            <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-slate-700 italic text-xs">
              &quot;{order.specialRequest}&quot;
            </div>
          </div>
        )}

        {/* Waktu Pemesanan */}
        <div className="text-xs text-slate-400 font-medium">
          Dibuat: {new Date(order.createdAt).toLocaleString("id-ID")}
        </div>

        {/* Tombol Aksi Staf */}
        {isStaff && order.status !== "Completed" && order.status !== "Cancelled" && (
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <p className="text-xs font-bold text-slate-700">Tindak Lanjut Staf:</p>
            <div className="grid grid-cols-2 gap-2">
              {order.status === "New" && (
                <Button
                  size="sm"
                  variant="outline"
                  isLoading={isUpdating}
                  onClick={() => onUpdateStatus(order.id, "Acknowledged")}
                  className="w-full text-amber-700 border-amber-300 hover:bg-amber-50 rounded-full"
                >
                  <UserCheck className="w-3.5 h-3.5 mr-1" />
                  Terima Request
                </Button>
              )}
              {(order.status === "New" || order.status === "Acknowledged") && (
                <Button
                  size="sm"
                  variant="outline"
                  isLoading={isUpdating}
                  onClick={() => onUpdateStatus(order.id, "InProgress")}
                  className="w-full text-violet-700 border-violet-300 hover:bg-violet-50 rounded-full"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1" />
                  Mulai Proses
                </Button>
              )}
              {order.status === "InProgress" && (
                <Button
                  size="sm"
                  variant="primary"
                  isLoading={isUpdating}
                  onClick={() => onUpdateStatus(order.id, "Completed")}
                  className="w-full col-span-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold py-2.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Tandai Selesai
                </Button>
              )}
              <Button
                size="sm"
                variant="danger"
                isLoading={isUpdating}
                onClick={() => onUpdateStatus(order.id, "Cancelled")}
                className="w-full col-span-2 rounded-full py-2.5"
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
