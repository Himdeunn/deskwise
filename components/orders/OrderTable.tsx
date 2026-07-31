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
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);

  if (orders.length === 0) {
    return (
      <EmptyState
        title="No Orders Found"
        description="No orders match your current search or filter criteria."
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
      {/* Desktop Table (md+) */}
      <div className="hidden md:block overflow-x-auto rounded-3xl border border-slate-100 bg-white shadow-xs">
        <table className="w-full min-w-[780px] text-left text-xs text-slate-600">
          <thead className="bg-slate-50/80 text-[11px] uppercase font-bold text-slate-400 border-b border-slate-100 tracking-wider">
            <tr>
              <th className="px-4 lg:px-6 py-4 whitespace-nowrap">Room</th>
              <th className="px-4 lg:px-6 py-4 whitespace-nowrap">Guest</th>
              <th className="px-4 lg:px-6 py-4 whitespace-nowrap">Service</th>
              <th className="px-4 lg:px-6 py-4 whitespace-nowrap">Amount</th>
              <th className="px-4 lg:px-6 py-4 whitespace-nowrap">Status</th>
              <th className="px-4 lg:px-6 py-4 whitespace-nowrap">Payment</th>
              <th className="px-4 lg:px-6 py-4 text-right whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {orders.map((ord) => (
              <tr key={ord.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                  <span className="inline-block px-2.5 py-1 bg-[#f0f5ff] text-[#0F3D91] border border-[#BBD4FF]/60 rounded-full font-extrabold text-xs">
                    Rm-{ord.roomNumber}
                  </span>
                </td>
                <td className="px-4 lg:px-6 py-4">
                  <div className="font-extrabold text-slate-900 text-xs truncate max-w-[120px]">{ord.guest.name}</div>
                  <div className="text-[11px] text-slate-400">#{ord.id.slice(-5)}</div>
                </td>
                <td className="px-4 lg:px-6 py-4 font-bold text-slate-800 whitespace-nowrap">
                  {ord.service} ({ord.quantity}×)
                </td>
                <td className="px-4 lg:px-6 py-4 font-extrabold text-[#0F3D91] whitespace-nowrap">
                  {formatIDR(ord.amount)}
                </td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1.5 flex-nowrap">
                    <OrderStatusBadge status={ord.status} />
                    <SlaBadge createdAt={ord.createdAt} status={ord.status} />
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                  <PaymentStatusBadge status={ord.paymentStatus} />
                </td>
                <td className="px-4 lg:px-6 py-4 text-right whitespace-nowrap">
                  <div className="inline-flex items-center justify-end gap-2 shrink-0">
                    {isStaff && ord.status === "New" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs py-1 px-3 rounded-full border-amber-300 text-amber-700 hover:bg-amber-50 font-bold whitespace-nowrap shrink-0"
                        onClick={() => handleUpdate(ord.id, "Acknowledged")}
                      >
                        <UserCheck className="w-3.5 h-3.5 mr-1 shrink-0" />
                        Accept
                      </Button>
                    )}
                    {isStaff && ord.status === "Acknowledged" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs py-1 px-3 rounded-full border-violet-300 text-violet-700 hover:bg-violet-50 font-bold whitespace-nowrap shrink-0"
                        onClick={() => handleUpdate(ord.id, "InProgress")}
                      >
                        <RefreshCw className="w-3.5 h-3.5 mr-1 shrink-0" />
                        Process
                      </Button>
                    )}
                    {isStaff && ord.status === "InProgress" && (
                      <Button
                        size="sm"
                        variant="primary"
                        className="text-xs py-1 px-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold whitespace-nowrap shrink-0"
                        onClick={() => handleUpdate(ord.id, "Completed")}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1 shrink-0" />
                        Complete
                      </Button>
                    )}
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="p-1.5 rounded-full text-slate-400 hover:text-[#0F3D91] hover:bg-[#f0f5ff] transition-colors shrink-0"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List (<md) */}
      <div className="md:hidden space-y-3">
        {orders.map((ord) => (
          <div key={ord.id} className="p-4 bg-white rounded-3xl border border-slate-100 shadow-xs space-y-3">
            <div className="flex items-start justify-between gap-2">
              <span className="px-2.5 py-1 text-xs font-extrabold bg-[#f0f5ff] text-[#0F3D91] rounded-full shrink-0">
                Room {ord.roomNumber}
              </span>
              <div className="flex items-center gap-1.5 flex-wrap justify-end">
                <OrderStatusBadge status={ord.status} />
                <SlaBadge createdAt={ord.createdAt} status={ord.status} />
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-extrabold text-slate-900 text-sm truncate">
                  {ord.service} <span className="font-bold text-slate-500">({ord.quantity}×)</span>
                </p>
                <p className="text-xs text-slate-500 font-semibold mt-0.5 truncate">Guest: {ord.guest.name}</p>
              </div>
              <p className="font-extrabold text-[#0F3D91] text-sm shrink-0">{formatIDR(ord.amount)}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-2">
              <PaymentStatusBadge status={ord.paymentStatus} />
              <div className="flex items-center gap-2">
                {isStaff && ord.status === "New" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs py-1 px-3 rounded-full border-amber-300 text-amber-700 hover:bg-amber-50 font-bold shrink-0"
                    onClick={() => handleUpdate(ord.id, "Acknowledged")}
                  >
                    <UserCheck className="w-3.5 h-3.5 mr-1" /> Accept
                  </Button>
                )}
                {isStaff && ord.status === "Acknowledged" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs py-1 px-3 rounded-full border-violet-300 text-violet-700 hover:bg-violet-50 font-bold shrink-0"
                    onClick={() => handleUpdate(ord.id, "InProgress")}
                  >
                    <RefreshCw className="w-3.5 h-3.5 mr-1" /> Process
                  </Button>
                )}
                {isStaff && ord.status === "InProgress" && (
                  <Button
                    size="sm"
                    variant="primary"
                    className="text-xs py-1 px-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold shrink-0"
                    onClick={() => handleUpdate(ord.id, "Completed")}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Complete
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full font-bold text-xs py-1 px-3 shrink-0"
                  onClick={() => setSelectedOrder(ord)}
                >
                  <Eye className="w-3.5 h-3.5 mr-1" />
                  Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

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
