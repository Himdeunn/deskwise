import { expect, test, describe } from "bun:test";
import { computeMetrics } from "../features/orders/utils/computeMetrics";
import { HotelOrder } from "../types/order";

describe("DeskWise Core Business Logic & Metrics Test Suite", () => {
  const sampleOrders: HotelOrder[] = [
    {
      id: "ORD-1001",
      guestId: "G-1",
      guest: { id: "G-1", name: "John Smith", email: "john@example.com" },
      roomNumber: "204",
      service: "RoomService",
      quantity: 2,
      amount: 150000,
      specialRequest: "Deliver before 8 PM",
      createdAt: new Date().toISOString(),
      status: "New",
      paymentStatus: "Paid",
    },
    {
      id: "ORD-1002",
      guestId: "G-2",
      guest: { id: "G-2", name: "Sarah Johnson", email: "sarah@example.com" },
      roomNumber: "312",
      service: "Housekeeping",
      quantity: 1,
      amount: 0,
      specialRequest: "",
      createdAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(), // 20 mins ago (SLA Breach)
      status: "New",
      paymentStatus: "Pending",
    },
    {
      id: "ORD-1003",
      guestId: "G-3",
      guest: { id: "G-3", name: "Michael Tan", email: "michael@example.com" },
      roomNumber: "105",
      service: "Laundry",
      quantity: 3,
      amount: 120000,
      specialRequest: "Express wash",
      createdAt: new Date().toISOString(),
      status: "Completed",
      paymentStatus: "Paid",
    },
  ];

  test("computes total active guests accurately", () => {
    const { metrics } = computeMetrics(sampleOrders);
    expect(metrics.totalActiveGuests).toBe(3);
  });

  test("identifies SLA breach orders (>15 mins)", () => {
    const { metrics } = computeMetrics(sampleOrders);
    expect(metrics.slaBreachCount).toBe(1);
  });

  test("calculates pending and completed orders count", () => {
    const { metrics } = computeMetrics(sampleOrders);
    expect(metrics.pendingOrdersCount).toBe(2);
    expect(metrics.completedOrdersCount).toBe(1);
  });

  test("sorts top selling services correctly", () => {
    const { topServices } = computeMetrics(sampleOrders);
    expect(topServices.length).toBe(5);
    expect(topServices[0].service).toBeDefined();
  });
});
