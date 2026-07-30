import React from "react";
import { Card } from "@/components/ui/Card";
import { LucideIcon } from "lucide-react";
import { clsx } from "clsx";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  badgeText?: string;
  icon: LucideIcon;
  variant?: "neutral" | "warning" | "danger" | "success" | "info" | "purple";
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  badgeText,
  icon: Icon,
  variant = "neutral",
}) => {
  const iconVariants = {
    neutral: "bg-slate-100 text-slate-700",
    info: "bg-sky-50 text-sky-600",
    success: "bg-emerald-50 text-emerald-600",
    warning: "bg-amber-50 text-amber-600",
    danger: "bg-rose-50 text-rose-600",
    purple: "bg-violet-50 text-violet-600",
  };

  return (
    <Card className="flex items-start justify-between relative overflow-hidden group">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {title}
          </span>
          {badgeText && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">
              {badgeText}
            </span>
          )}
        </div>
        <p className="text-2xl font-extrabold text-slate-900 tracking-tight">{value}</p>
        {subtitle && <p className="text-xs text-slate-500 font-medium">{subtitle}</p>}
      </div>

      <div
        className={clsx(
          "flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 shadow-xs",
          iconVariants[variant]
        )}
      >
        <Icon className="h-6 w-6" />
      </div>
    </Card>
  );
};
