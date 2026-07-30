import { HotelOrder, DashboardMetrics, ServiceStat, ServiceType } from "@/types/order";

export function computeMetrics(orders: HotelOrder[]): {
  metrics: DashboardMetrics;
  topServices: ServiceStat[];
} {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  let pendingOrdersCount = 0;
  let todayRevenue = 0;
  let completedOrdersCount = 0;
  let slaBreachCount = 0;

  const activeGuestIds = new Set<string>();
  const serviceMap: Record<ServiceType, { count: number; totalRevenue: number }> = {
    RoomService: { count: 0, totalRevenue: 0 },
    Housekeeping: { count: 0, totalRevenue: 0 },
    Laundry: { count: 0, totalRevenue: 0 },
    ExtraBed: { count: 0, totalRevenue: 0 },
    SpaMassage: { count: 0, totalRevenue: 0 },
  };

  orders.forEach((ord) => {
    activeGuestIds.add(ord.guestId);

    const createdTime = new Date(ord.createdAt).getTime();

    // Check SLA breach
    if (ord.status === "New") {
      pendingOrdersCount++;
      const diffMins = Math.floor((now.getTime() - createdTime) / (1000 * 60));
      if (diffMins >= 15) {
        slaBreachCount++;
      }
    } else if (ord.status === "Acknowledged" || ord.status === "InProgress") {
      pendingOrdersCount++;
    } else if (ord.status === "Completed") {
      completedOrdersCount++;
    }

    // Revenue calculation
    if (createdTime >= todayStart && ord.status !== "Cancelled" && ord.paymentStatus === "Paid") {
      todayRevenue += ord.amount;
    }

    // Service stats
    if (serviceMap[ord.service]) {
      serviceMap[ord.service].count += 1;
      if (ord.paymentStatus === "Paid") {
        serviceMap[ord.service].totalRevenue += ord.amount;
      }
    }
  });

  const totalRevenueAll = orders
    .filter((o) => o.paymentStatus === "Paid")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const paidOrdersCount = orders.filter((o) => o.paymentStatus === "Paid").length;
  const avgOrderValue = paidOrdersCount > 0 ? Math.round(totalRevenueAll / paidOrdersCount) : 0;

  const topServices: ServiceStat[] = (Object.keys(serviceMap) as ServiceType[])
    .map((srv) => ({
      service: srv,
      count: serviceMap[srv].count,
      totalRevenue: serviceMap[srv].totalRevenue,
    }))
    .sort((a, b) => b.count - a.count);

  return {
    metrics: {
      totalActiveGuests: activeGuestIds.size,
      pendingOrdersCount,
      todayRevenue,
      completedOrdersCount,
      avgOrderValue,
      slaBreachCount,
    },
    topServices,
  };
}
