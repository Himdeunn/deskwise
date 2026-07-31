import React from "react";
import { DashboardMetrics as IDashboardMetrics } from "@/types/order";
import { MetricCard } from "./MetricCard";

interface DashboardMetricsProps {
  metrics: IDashboardMetrics;
}

export const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ metrics }) => {
  const formatIDR = (val: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
      <MetricCard
        title="Tamu Menginap"
        value={metrics.totalActiveGuests}
        subtitle="Tamu dengan request aktif"
        isFeatured={true}
      />
      <MetricCard
        title="Perlu Ditangani"
        value={metrics.pendingOrdersCount}
        subtitle="Pesanan belum selesai"
      />
      <MetricCard
        title="Lewat SLA (>15m)"
        value={metrics.slaBreachCount}
        subtitle="Terlambat di-ack"
      />
      <MetricCard
        title="Pemasukan Hari Ini"
        value={formatIDR(metrics.todayRevenue)}
        subtitle="Total pembayaran lunas"
      />
    </div>
  );
};
