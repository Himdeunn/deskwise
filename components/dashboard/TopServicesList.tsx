import React from "react";
import { ServiceStat } from "@/types/order";
import { Card } from "@/components/ui/Card";
import { Sparkles } from "lucide-react";

interface TopServicesListProps {
  stats: ServiceStat[];
}

const SERVICE_LABELS: Record<string, string> = {
  RoomService: "Room Service",
  Housekeeping: "Housekeeping",
  Laundry: "Laundry",
  ExtraBed: "Extra Bed",
  SpaMassage: "Spa & Massage",
};

export const TopServicesList: React.FC<TopServicesListProps> = ({ stats }) => {
  const maxCount = Math.max(...stats.map((s) => s.count), 1);

  return (
    <Card className="space-y-4 rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-xs h-full">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm sm:text-base font-extrabold text-[#0F3D91] truncate">Layanan Terpopuler</h3>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">Permintaan terbanyak tamu hotel</p>
        </div>
        <div className="h-9 w-9 rounded-2xl bg-[#f0f5ff] text-[#1A73E8] flex items-center justify-center shrink-0">
          <Sparkles className="h-5 w-5" />
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4 pt-1">
        {stats.map((item) => {
          const percentage = Math.round((item.count / maxCount) * 100);
          return (
            <div key={item.service} className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700 gap-2">
                <span className="truncate">{SERVICE_LABELS[item.service] || item.service}</span>
                <span className="font-extrabold text-[#0F3D91] shrink-0">{item.count}x</span>
              </div>
              <div className="h-2 sm:h-2.5 w-full overflow-hidden rounded-full bg-[#BBD4FF]/30">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#0F3D91] to-[#1A73E8] transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
