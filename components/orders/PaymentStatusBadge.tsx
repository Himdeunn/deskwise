import React from "react";
import { PaymentStatus } from "@/types/order";
import { Badge } from "@/components/ui/Badge";

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

export const PaymentStatusBadge: React.FC<PaymentStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case "Paid":
      return <Badge variant="success">Lunas</Badge>;
    case "Pending":
      return <Badge variant="warning">Pending</Badge>;
    case "Failed":
      return <Badge variant="danger">Gagal</Badge>;
    default:
      return <Badge variant="neutral">{status}</Badge>;
  }
};
