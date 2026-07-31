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
    <div className="bg-white p-3.5 sm:p-4 rounded-3xl border border-slate-100 shadow-xs">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by room number or guest name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full bg-[#f8fafc] border border-slate-200/80 pl-11 pr-4 py-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/30 transition"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 shrink-0">
          <div className="w-full sm:w-44">
            <Select
              options={[
                { value: "ALL", label: "All Statuses" },
                { value: "New", label: "New" },
                { value: "Acknowledged", label: "Acknowledged" },
                { value: "InProgress", label: "In Progress" },
                { value: "Completed", label: "Completed" },
                { value: "Cancelled", label: "Cancelled" },
              ]}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-full text-xs font-semibold bg-[#f8fafc] border-slate-200/80 py-2.5"
            />
          </div>
          <div className="w-full sm:w-44">
            <Select
              options={[
                { value: "ALL", label: "All Services" },
                { value: "RoomService", label: "Room Service" },
                { value: "Housekeeping", label: "Housekeeping" },
                { value: "Laundry", label: "Laundry" },
                { value: "ExtraBed", label: "Extra Bed" },
                { value: "SpaMassage", label: "Spa & Massage" },
              ]}
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full rounded-full text-xs font-semibold bg-[#f8fafc] border-slate-200/80 py-2.5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
