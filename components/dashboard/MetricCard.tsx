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
        "rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-md relative overflow-hidden min-h-[120px]",
        isFeatured
          ? "bg-[#0F3D91] text-white shadow-lg shadow-blue-900/15"
          : "bg-white text-slate-900 border border-slate-100 shadow-xs"
      )}
    >
      <div className="flex items-start justify-between mb-4 sm:mb-6 gap-2">
        <span
          className={clsx(
            "text-[10px] sm:text-xs font-bold uppercase tracking-wider leading-tight",
            isFeatured ? "text-slate-200" : "text-slate-500"
          )}
        >
          {title}
        </span>
        <div
          className={clsx(
            "h-8 w-8 sm:h-9 sm:w-9 rounded-full flex items-center justify-center shrink-0 transition-transform hover:scale-110 cursor-pointer",
            isFeatured
              ? "bg-white/20 text-white"
              : "bg-[#f0f5ff] text-[#0F3D91]"
          )}
        >
          <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-none">{value}</p>
        {subtitle && (
          <p
            className={clsx(
              "text-[11px] sm:text-xs font-semibold mt-1",
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
