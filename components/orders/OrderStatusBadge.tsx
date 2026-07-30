import React from "react";
import { OrderStatus } from "@/types/order";
import { Badge } from "@/components/ui/Badge";
import { Clock, CheckCircle2, AlertCircle, RefreshCw, XCircle } from "lucide-react";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case "New":
      return (
        <Badge variant="info" className="gap-1 rounded-full px-3 py-1 font-semibold">
          <Clock className="w-3 h-3 text-sky-600" />
          Baru
        </Badge>
      );
    case "Acknowledged":
      return (
        <Badge variant="warning" className="gap-1 rounded-full px-3 py-1 font-semibold">
          <AlertCircle className="w-3 h-3 text-amber-600" />
          Diterima
        </Badge>
      );
    case "InProgress":
      return (
        <Badge variant="purple" className="gap-1 rounded-full px-3 py-1 font-semibold">
          <RefreshCw className="w-3 h-3 animate-spin text-violet-600" />
          Diproses
        </Badge>
      );
    case "Completed":
      return (
        <Badge variant="success" className="gap-1 rounded-full px-3 py-1 font-semibold">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          Selesai
        </Badge>
      );
    case "Cancelled":
      return (
        <Badge variant="danger" className="gap-1 rounded-full px-3 py-1 font-semibold">
          <XCircle className="w-3 h-3 text-rose-600" />
          Batal
        </Badge>
      );
    default:
      return <Badge variant="neutral" className="rounded-full px-3 py-1 font-semibold">{status}</Badge>;
  }
};
