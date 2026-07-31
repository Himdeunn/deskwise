import React from "react";
import { ArrowUpRight } from "lucide-react";
import { clsx } from "clsx";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  isFeatured?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  isFeatured = false,
}) => {
  return (
    <div
      className={clsx(
        "rounded-3xl p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-md relative overflow-hidden",
        isFeatured
          ? "bg-[#0F3D91] text-white shadow-lg shadow-blue-900/15"
          : "bg-white text-slate-900 border border-slate-100 shadow-xs"
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <span
          className={clsx(
            "text-xs font-bold uppercase tracking-wider",
            isFeatured ? "text-slate-200" : "text-slate-500"
          )}
        >
          {title}
        </span>
        <div
          className={clsx(
            "h-9 w-9 rounded-full flex items-center justify-center transition-transform hover:scale-110 cursor-pointer",
            isFeatured
              ? "bg-white/20 text-white backdrop-blur-xs"
              : "bg-[#f0f5ff] text-[#0F3D91]"
          )}
        >
          <ArrowUpRight className="h-5 w-5" />
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-3xl font-extrabold tracking-tight">{value}</p>
        {subtitle && (
          <p
            className={clsx(
              "text-xs font-semibold",
              isFeatured ? "text-slate-200" : "text-slate-500"
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
