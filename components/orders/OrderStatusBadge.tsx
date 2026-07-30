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
        <Badge variant="info" className="gap-1">
          <Clock className="w-3 h-3" />
          Baru
        </Badge>
      );
    case "Acknowledged":
      return (
        <Badge variant="warning" className="gap-1">
          <AlertCircle className="w-3 h-3" />
          Diterima
        </Badge>
      );
    case "InProgress":
      return (
        <Badge variant="purple" className="gap-1">
          <RefreshCw className="w-3 h-3 animate-spin" />
          Diproses
        </Badge>
      );
    case "Completed":
      return (
        <Badge variant="success" className="gap-1">
          <CheckCircle2 className="w-3 h-3" />
          Selesai
        </Badge>
      );
    case "Cancelled":
      return (
        <Badge variant="danger" className="gap-1">
          <XCircle className="w-3 h-3" />
          Dibatalkan
        </Badge>
      );
    default:
      return <Badge variant="neutral">{status}</Badge>;
  }
};
