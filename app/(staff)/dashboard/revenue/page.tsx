"use client";

import React, { useState } from "react";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PaymentStatusBadge } from "@/components/orders/PaymentStatusBadge";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  PieChart,
  RefreshCw,
  Search,
  Receipt,
  Sparkles,
} from "lucide-react";

const SERVICE_LABELS: Record<string, string> = {
  RoomService: "Room Service",
  Housekeeping: "Housekeeping",
  Laundry: "Laundry & Wash",
  ExtraBed: "Extra Bed",
  SpaMassage: "Spa & Massage",
};

export default function RevenueAnalyticsPage() {
  const [search, setSearch] = useState("");
  const { data: orders = [], isLoading, refetch } = useOrders();

  const formatIDR = (val: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);

  // Financial Computations
  const paidOrders = orders.filter((o) => o.paymentStatus === "Paid");
  const pendingOrders = orders.filter((o) => o.paymentStatus === "Pending");

  const todayStr = new Date().toISOString().split("T")[0];
  const todayPaidOrders = paidOrders.filter(
    (o) => new Date(o.createdAt).toISOString().split("T")[0] === todayStr
  );

  const todayRevenue = todayPaidOrders.reduce((sum, o) => sum + o.amount, 0);
  const totalRevenue = paidOrders.reduce((sum, o) => sum + o.amount, 0);
  const pendingRevenue = pendingOrders.reduce((sum, o) => sum + o.amount, 0);
  const avgOrderValue = paidOrders.length > 0 ? Math.round(totalRevenue / paidOrders.length) : 0;

  // Revenue by Service Breakdown
  const serviceRevenueMap: Record<string, number> = {
    RoomService: 0,
    Housekeeping: 0,
    Laundry: 0,
    ExtraBed: 0,
    SpaMassage: 0,
  };

  paidOrders.forEach((o) => {
    if (serviceRevenueMap[o.service] !== undefined) {
      serviceRevenueMap[o.service] += o.amount;
    }
  });

  const maxServiceRevenue = Math.max(...Object.values(serviceRevenueMap), 1);

  // Filter transactions for history table
  const filteredTransactions = orders.filter((o) => {
    const query = search.toLowerCase();
    return (
      o.roomNumber.toString().includes(query) ||
      o.guest.name.toLowerCase().includes(query) ||
      o.service.toLowerCase().includes(query) ||
      o.id.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F3D91] tracking-tight">
              Revenue & Financial Analytics
            </h1>
            <span className="px-3 py-1 text-xs font-extrabold bg-[#f0f5ff] text-[#0F3D91] border border-[#BBD4FF]/60 rounded-full shadow-xs inline-flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-[#1A73E8]" />
              Financial Report
            </span>
          </div>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Comprehensive audit of hotel service earnings, paid transactions, and revenue breakdown.
          </p>
        </div>

        <button
          onClick={() => refetch()}
          className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 bg-white border border-slate-200/80 rounded-full text-slate-700 hover:bg-slate-50 transition-all shadow-xs self-start sm:self-auto"
        >
          <RefreshCw className="h-3.5 w-3.5 text-[#1A73E8]" />
          Refresh Report
        </button>
      </div>

      {/* Financial Metric Cards */}
      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-3xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          <MetricCard
            title="Today's Earnings"
            value={formatIDR(todayRevenue)}
            subtitle={`${todayPaidOrders.length} paid orders today`}
            isFeatured={true}
          />
          <MetricCard
            title="Total Revenue"
            value={formatIDR(totalRevenue)}
            subtitle={`${paidOrders.length} total paid orders`}
          />
          <MetricCard
            title="Avg. Order Value"
            value={formatIDR(avgOrderValue)}
            subtitle="Average per paid request"
          />
          <MetricCard
            title="Pending Revenue"
            value={formatIDR(pendingRevenue)}
            subtitle={`${pendingOrders.length} orders awaiting payment`}
          />
        </div>
      )}

      {/* Middle Section: Revenue by Service & Payment Ratio */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Revenue by Service Type */}
        <Card className="lg:col-span-2 rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-xs space-y-5 bg-white">
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-2xl bg-[#f0f5ff] text-[#1A73E8] flex items-center justify-center shrink-0">
                <PieChart className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-[#0F3D91]">
                  Earnings by Service Category
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  Total revenue generated across hotel service departments
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#1A73E8] bg-[#f0f5ff] px-3 py-1 rounded-full border border-[#BBD4FF]/60">
              {paidOrders.length} Paid Requests
            </span>
          </div>

          {isLoading ? (
            <Skeleton className="h-44 w-full rounded-2xl" />
          ) : (
            <div className="space-y-4">
              {Object.entries(serviceRevenueMap).map(([serviceKey, amount]) => {
                const percentage =
                  totalRevenue > 0 ? Math.round((amount / totalRevenue) * 100) : 0;
                const barWidth =
                  maxServiceRevenue > 0
                    ? Math.round((amount / maxServiceRevenue) * 100)
                    : 0;

                return (
                  <div key={serviceKey} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800 gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="truncate">
                          {SERVICE_LABELS[serviceKey] || serviceKey}
                        </span>
                        <span className="text-[11px] text-slate-400 font-normal">
                          ({percentage}%)
                        </span>
                      </div>
                      <span className="font-extrabold text-[#0F3D91] shrink-0">
                        {formatIDR(amount)}
                      </span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-[#BBD4FF]/30">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#0F3D91] to-[#1A73E8] transition-all duration-500"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        {/* Payment Collection Overview */}
        <Card className="rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-xs space-y-5 bg-white flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <div className="h-9 w-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Receipt className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  Payment Status Summary
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  Collection progress ratio
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1">
                <div className="flex justify-between items-center text-xs font-bold text-emerald-900">
                  <span>Collected (Paid)</span>
                  <span className="font-extrabold text-sm">{formatIDR(totalRevenue)}</span>
                </div>
                <p className="text-[11px] text-emerald-700 font-medium">
                  {paidOrders.length} completed transactions
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1">
                <div className="flex justify-between items-center text-xs font-bold text-amber-900">
                  <span>Outstanding (Pending)</span>
                  <span className="font-extrabold text-sm">{formatIDR(pendingRevenue)}</span>
                </div>
                <p className="text-[11px] text-amber-700 font-medium">
                  {pendingOrders.length} orders awaiting payment
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Sparkles className="h-4 w-4 text-[#1A73E8] shrink-0" />
            <span>Updated live from DeskWise billing ledger.</span>
          </div>
        </Card>
      </div>

      {/* Transaction History Table */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-extrabold text-[#0F3D91]">
              Financial Transaction Ledger
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Detailed list of guest service orders with transaction amounts
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by room or guest..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full bg-[#f8fafc] border border-slate-200/80 pl-9 pr-4 py-2 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/30 transition"
            />
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <Skeleton className="h-64 w-full rounded-2xl" />
        ) : filteredTransactions.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500 font-medium bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            No transactions match your search query.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white">
            <table className="w-full min-w-[700px] text-left text-xs text-slate-600">
              <thead className="bg-slate-50/80 text-[11px] uppercase font-bold text-slate-400 border-b border-slate-100 tracking-wider">
                <tr>
                  <th className="px-5 py-3.5 whitespace-nowrap">Room</th>
                  <th className="px-5 py-3.5 whitespace-nowrap">Guest</th>
                  <th className="px-5 py-3.5 whitespace-nowrap">Service</th>
                  <th className="px-5 py-3.5 whitespace-nowrap">Amount</th>
                  <th className="px-5 py-3.5 whitespace-nowrap">Payment</th>
                  <th className="px-5 py-3.5 whitespace-nowrap">Order Status</th>
                  <th className="px-5 py-3.5 text-right whitespace-nowrap">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredTransactions.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span className="inline-block px-2.5 py-1 bg-[#f0f5ff] text-[#0F3D91] border border-[#BBD4FF]/60 rounded-full font-extrabold text-xs">
                        Rm-{ord.roomNumber}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="font-extrabold text-slate-900 text-xs truncate max-w-[140px]">
                        {ord.guest.name}
                      </div>
                      <div className="text-[11px] text-slate-400">#{ord.id.slice(-5)}</div>
                    </td>
                    <td className="px-5 py-3.5 font-bold text-slate-800 whitespace-nowrap">
                      {ord.service} ({ord.quantity}×)
                    </td>
                    <td className="px-5 py-3.5 font-extrabold text-[#0F3D91] whitespace-nowrap">
                      {formatIDR(ord.amount)}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <PaymentStatusBadge status={ord.paymentStatus} />
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <OrderStatusBadge status={ord.status} />
                    </td>
                    <td className="px-5 py-3.5 text-right text-xs text-slate-500 whitespace-nowrap">
                      {new Date(ord.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
