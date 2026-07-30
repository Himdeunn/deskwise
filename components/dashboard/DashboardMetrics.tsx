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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <MetricCard
        title="Tamu Aktif"
        value={metrics.totalActiveGuests}
        subtitle="Memiliki setidaknya 1 pesanan"
        icon={Users}
        variant="info"
      />
      <MetricCard
        title="Pesanan Pending"
        value={metrics.pendingOrdersCount}
        subtitle="Membutuhkan penanganan"
        icon={Clock}
        variant="warning"
      />
      <MetricCard
        title="SLA Breach (>15m)"
        value={metrics.slaBreachCount}
        subtitle="Pesanan 'New' belum di-ack"
        icon={ShieldAlert}
        variant={metrics.slaBreachCount > 0 ? "danger" : "neutral"}
      />
      <MetricCard
        title="Pendapatan Hari Ini"
        value={formatIDR(metrics.todayRevenue)}
        subtitle="Total transaksi terbayar"
        icon={DollarSign}
        variant="success"
      />
      <MetricCard
        title="Pesanan Selesai"
        value={metrics.completedOrdersCount}
        subtitle="Layanan berhasil diproses"
        icon={CheckCircle2}
        variant="success"
      />
      <MetricCard
        title="Rata-rata Nilai Order"
        value={formatIDR(metrics.avgOrderValue)}
        subtitle="Per transaksi terbayar"
        icon={TrendingUp}
        variant="neutral"
      />
    </div>
  );
};
