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
    <div className="flex flex-col gap-3 bg-white p-4 rounded-3xl border border-slate-100 shadow-xs">
      {/* Search Bar – full width on all screens */}
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Cari nomor kamar atau nama tamu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full bg-[#f8fafc] border border-slate-200/80 pl-11 pr-4 py-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/30 transition"
        />
      </div>

      {/* Filters Row – stacked on very small screens */}
      <div className="flex flex-col xs:flex-row gap-2.5 sm:gap-3">
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
          className="flex-1 rounded-full text-xs font-semibold"
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
          className="flex-1 rounded-full text-xs font-semibold"
        />
      </div>
    </div>
  );
};
