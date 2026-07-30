import React from "react";
import { ServiceStat } from "@/types/order";
import { Card } from "@/components/ui/Card";
import { Sparkles } from "lucide-react";

interface TopServicesListProps {
  stats: ServiceStat[];
}

const SERVICE_LABELS: Record<string, string> = {
  RoomService: "Room Service (Makanan & Minuman)",
  Housekeeping: "Housekeeping & Kebersihan",
  Laundry: "Laundry & Cuci Pakaian",
  ExtraBed: "Extra Bed & Perlengkapan Kamar",
  SpaMassage: "Spa & Traditional Massage",
};

export const TopServicesList: React.FC<TopServicesListProps> = ({ stats }) => {
  const maxCount = Math.max(...stats.map((s) => s.count), 1);

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Top Service Demands</h3>
          <p className="text-xs text-slate-500">Layanan yang paling sering diminta oleh tamu hotel</p>
        </div>
        <Sparkles className="h-5 w-5 text-amber-500" />
      </div>

      <div className="space-y-3">
        {stats.map((item) => {
          const percentage = Math.round((item.count / maxCount) * 100);
          return (
            <div key={item.service} className="space-y-1">
              <div className="flex justify-between text-xs font-medium text-slate-700">
                <span>{SERVICE_LABELS[item.service] || item.service}</span>
                <span className="font-semibold text-slate-900">{item.count} pesanan</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-sky-500 transition-all duration-500"
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
