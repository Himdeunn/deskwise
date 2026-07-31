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
        <Badge variant="info" className="gap-1 rounded-full px-3 py-1 font-bold bg-[#f0f5ff] text-[#1A73E8] border border-[#BBD4FF]">
          <Clock className="w-3 h-3 text-[#1A73E8]" />
          New
        </Badge>
      );
    case "Acknowledged":
      return (
        <Badge variant="warning" className="gap-1 rounded-full px-3 py-1 font-bold bg-amber-50 text-amber-700 border border-amber-200">
          <AlertCircle className="w-3 h-3 text-amber-600" />
          Acknowledged
        </Badge>
      );
    case "InProgress":
      return (
        <Badge variant="purple" className="gap-1 rounded-full px-3 py-1 font-bold bg-violet-50 text-violet-700 border border-violet-200">
          <RefreshCw className="w-3 h-3 animate-spin text-violet-600" />
          In Progress
        </Badge>
      );
    case "Completed":
      return (
        <Badge variant="success" className="gap-1 rounded-full px-3 py-1 font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          Completed
        </Badge>
      );
    case "Cancelled":
      return (
        <Badge variant="danger" className="gap-1 rounded-full px-3 py-1 font-bold bg-rose-50 text-rose-700 border border-rose-200">
          <XCircle className="w-3 h-3 text-rose-600" />
          Cancelled
        </Badge>
      );
    default:
      return <Badge variant="neutral" className="rounded-full px-3 py-1 font-bold">{status}</Badge>;
  }
};
