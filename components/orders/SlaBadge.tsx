import React from "react";
import { OrderStatus } from "@/types/order";
import { Badge } from "@/components/ui/Badge";
import { ShieldAlert } from "lucide-react";

interface SlaBadgeProps {
  createdAt: string | Date;
  status: OrderStatus;
}

export const SlaBadge: React.FC<SlaBadgeProps> = ({ createdAt, status }) => {
  if (status !== "New") return null;

  const createdTime = new Date(createdAt).getTime();
  const now = new Date().getTime();
  const diffMinutes = Math.floor((now - createdTime) / (1000 * 60));

  const isBreached = diffMinutes >= 15;

  if (!isBreached) return null;

  return (
    <Badge
      variant="danger"
      className="gap-1 animate-pulse font-semibold shadow-xs border-rose-300"
    >
      <ShieldAlert className="w-3 h-3 text-rose-600" />
      URGENT ({diffMinutes}m)
    </Badge>
  );
};
