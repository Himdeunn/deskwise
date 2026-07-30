import React from "react";
import { Input } from "@/components/ui/Input";
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
    <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
      <div className="relative w-full sm:w-72">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Cari kamar / nama tamu / request..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="flex w-full sm:w-auto gap-3">
        <Select
          options={[
            { value: "ALL", label: "Semua Status" },
            { value: "New", label: "New (Baru)" },
            { value: "Acknowledged", label: "Acknowledged (Diterima)" },
            { value: "InProgress", label: "InProgress (Diproses)" },
            { value: "Completed", label: "Completed (Selesai)" },
            { value: "Cancelled", label: "Cancelled (Dibatalkan)" },
          ]}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full sm:w-44"
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
          className="w-full sm:w-44"
        />
      </div>
    </div>
  );
};
