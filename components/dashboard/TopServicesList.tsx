import React from "react";
import { ServiceStat } from "@/types/order";
import { Card } from "@/components/ui/Card";
import { Flame } from "lucide-react";

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
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">Layanan Paling Sering Dipesan</h3>
          <p className="text-xs text-slate-500">Permintaan terpopuler dari tamu hotel</p>
        </div>
        <div className="h-9 w-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
          <Flame className="h-5 w-5" />
        </div>
      </div>

      <div className="space-y-4 pt-1">
        {stats.map((item) => {
          const percentage = Math.round((item.count / maxCount) * 100);
          return (
            <div key={item.service} className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>{SERVICE_LABELS[item.service] || item.service}</span>
                <span className="font-bold text-slate-900">{item.count} pesanan</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 transition-all duration-500"
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
