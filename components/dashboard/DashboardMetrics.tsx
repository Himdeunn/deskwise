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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
      <MetricCard
        title="Active Guests"
        value={metrics.totalActiveGuests}
        subtitle="Staying in hotel"
        isFeatured={true}
        href="/dashboard/orders"
      />
      <MetricCard
        title="Pending Orders"
        value={metrics.pendingOrdersCount}
        subtitle="Awaiting action"
        href="/dashboard/orders?status=New"
      />
      <MetricCard
        title="SLA Breach (>15m)"
        value={metrics.slaBreachCount}
        subtitle="Late response alert"
        href="/dashboard/orders?status=New"
      />
      <MetricCard
        title="Completed Orders"
        value={metrics.completedOrdersCount}
        subtitle="Fulfilled orders"
        href="/dashboard/orders?status=Completed"
      />
      <MetricCard
        title="Revenue Today"
        value={formatIDR(metrics.todayRevenue)}
        subtitle="View reports ↗"
        href="/dashboard/revenue"
      />
      <MetricCard
        title="Avg. Order Value"
        value={formatIDR(metrics.avgOrderValue)}
        subtitle="Average per order"
        href="/dashboard/revenue"
      />
    </div>
  );
};
