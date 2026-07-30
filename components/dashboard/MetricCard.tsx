import React from "react";
import { Card } from "@/components/ui/Card";
import { LucideIcon } from "lucide-react";
import { clsx } from "clsx";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "neutral" | "warning" | "danger" | "success" | "info";
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = "neutral",
}) => {
  const iconVariants = {
    neutral: "bg-slate-100 text-slate-600",
    info: "bg-sky-50 text-sky-600",
    success: "bg-emerald-50 text-emerald-600",
    warning: "bg-amber-50 text-amber-600",
    danger: "bg-rose-50 text-rose-600",
  };

  return (
    <Card className="flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          {title}
        </p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </div>
      <div className={clsx("flex h-12 w-12 items-center justify-center rounded-xl", iconVariants[variant])}>
        <Icon className="h-6 w-6" />
      </div>
    </Card>
  );
};
