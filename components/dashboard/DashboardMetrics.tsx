import React from "react";
import { DashboardMetrics as IDashboardMetrics } from "@/types/order";
import { MetricCard } from "./MetricCard";
import { Users, Clock, DollarSign, CheckCircle2, ShieldAlert, TrendingUp } from "lucide-react";

interface DashboardMetricsProps {
  metrics: IDashboardMetrics;
}

export const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ metrics }) => {
  const formatIDR = (val: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <MetricCard
        title="Tamu Menginap"
        value={metrics.totalActiveGuests}
        subtitle="Tamu dengan request aktif"
        icon={Users}
        variant="purple"
      />
      <MetricCard
        title="Perlu Ditangani"
        value={metrics.pendingOrdersCount}
        subtitle="Pesanan belum selesai"
        icon={Clock}
        variant="warning"
      />
      <MetricCard
        title="Lewat SLA (>15m)"
        value={metrics.slaBreachCount}
        subtitle="Pesanan baru terlambat di-ack"
        icon={ShieldAlert}
        variant={metrics.slaBreachCount > 0 ? "danger" : "neutral"}
      />
      <MetricCard
        title="Pemasukan Hari Ini"
        value={formatIDR(metrics.todayRevenue)}
        subtitle="Total transaksi lunas"
        icon={DollarSign}
        variant="success"
      />
      <MetricCard
        title="Pesanan Selesai"
        value={metrics.completedOrdersCount}
        subtitle="Berhasil dilayani staf"
        icon={CheckCircle2}
        variant="success"
      />
      <MetricCard
        title="Rata-Rata Order"
        value={formatIDR(metrics.avgOrderValue)}
        subtitle="Nilai per transaksi"
        icon={TrendingUp}
        variant="neutral"
      />
    </div>
  );
};
