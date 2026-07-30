export type Role = "SUPER_ADMIN" | "ADMIN" | "CUSTOMER";

export type OrderStatus = "New" | "Acknowledged" | "InProgress" | "Completed" | "Cancelled";

export type PaymentStatus = "Paid" | "Pending" | "Failed";

export type ServiceType =
  | "RoomService"
  | "Housekeeping"
  | "Laundry"
  | "ExtraBed"
  | "SpaMassage";

export interface UserSummary {
  id: string;
  name: string;
  email: string;
  role: Role;
  roomNumber?: string | null;
}

export interface HotelOrder {
  id: string;
  guestId: string;
  guest: UserSummary;
  roomNumber: string;
  service: ServiceType;
  quantity: number;
  amount: number;
  specialRequest?: string | null;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: string | Date;
  updatedAt: string | Date;
  handledById?: string | null;
  handledBy?: UserSummary | null;
}

export interface DashboardMetrics {
  totalActiveGuests: number;
  pendingOrdersCount: number;
  todayRevenue: number;
  completedOrdersCount: number;
  avgOrderValue: number;
  slaBreachCount: number;
}

export interface ServiceStat {
  service: ServiceType;
  count: number;
  totalRevenue: number;
}

export interface CreateOrderPayload {
  service: ServiceType;
  quantity: number;
  specialRequest?: string;
}

export interface UpdateOrderStatusPayload {
  status: OrderStatus;
}
