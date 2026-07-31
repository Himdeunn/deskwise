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
        title="Staying Guests"
        value={metrics.totalActiveGuests}
        subtitle="Guests with active requests"
        isFeatured={true}
        href="/dashboard/orders"
      />
      <MetricCard
        title="Pending Orders"
        value={metrics.pendingOrdersCount}
        subtitle="Orders awaiting action"
        href="/dashboard/orders?status=New"
      />
      <MetricCard
        title="SLA Breach (>15m)"
        value={metrics.slaBreachCount}
        subtitle="Late acknowledgement"
        href="/dashboard/orders?status=New"
      />
      <MetricCard
        title="Today's Revenue"
        value={formatIDR(metrics.todayRevenue)}
        subtitle="View financial reports ↗"
        href="/dashboard/revenue"
      />
    </div>
  );
};
