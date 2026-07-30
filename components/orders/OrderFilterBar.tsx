import React from "react";
import { Select } from "@/components/ui/Select";
import { Search } from "lucide-react";

interface OrderFilterBarProps {
  search: string;
  setSearch: (val: string) => void;
  status: string;
  setStatus: (val: string) => void;
  service: string;
  setService: (val: string) => void;
}

export const OrderFilterBar: React.FC<OrderFilterBarProps> = ({
  search,
  setSearch,
  status,
  setStatus,
  service,
  setService,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-4 top-3 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Cari nomor kamar atau nama tamu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full bg-slate-50 border border-slate-200/80 px-10 py-2 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
        />
      </div>

      <div className="flex w-full sm:w-auto gap-3">
        <Select
          options={[
            { value: "ALL", label: "Semua Status" },
            { value: "New", label: "Baru Masuk" },
            { value: "Acknowledged", label: "Diterima Staf" },
            { value: "InProgress", label: "Sedang Diproses" },
            { value: "Completed", label: "Selesai" },
            { value: "Cancelled", label: "Dibatalkan" },
          ]}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full sm:w-44 rounded-full text-xs"
        />

        <Select
          options={[
            { value: "ALL", label: "Semua Layanan" },
            { value: "RoomService", label: "Room Service" },
            { value: "Housekeeping", label: "Housekeeping" },
            { value: "Laundry", label: "Laundry" },
            { value: "ExtraBed", label: "Extra Bed" },
            { value: "SpaMassage", label: "Spa & Massage" },
          ]}
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full sm:w-44 rounded-full text-xs"
        />
      </div>
    </div>
  );
};
