import React from "react";
import { PaymentStatus } from "@/types/order";
import { Badge } from "@/components/ui/Badge";

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

export const PaymentStatusBadge: React.FC<PaymentStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case "Paid":
      return <Badge variant="success" className="rounded-full px-3 py-1 font-bold">Paid</Badge>;
    case "Pending":
      return <Badge variant="warning" className="rounded-full px-3 py-1 font-bold">Pending</Badge>;
    case "Failed":
      return <Badge variant="danger" className="rounded-full px-3 py-1 font-bold">Failed</Badge>;
    default:
      return <Badge variant="neutral" className="rounded-full px-3 py-1 font-bold">{status}</Badge>;
  }
};
