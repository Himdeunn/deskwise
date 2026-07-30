import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { HotelOrder, OrderStatus, CreateOrderPayload } from "@/types/order";

async function fetchOrders(search = "", status = "", service = ""): Promise<HotelOrder[]> {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (status) params.append("status", status);
  if (service) params.append("service", service);

  const res = await fetch(`/api/orders?${params.toString()}`);
  if (!res.ok) {
    throw new Error("Gagal mengambil data pesanan.");
  }
  return res.json();
}

export function useOrders(search = "", status = "", service = "") {
  return useQuery({
    queryKey: ["orders", search, status, service],
    queryFn: () => fetchOrders(search, status, service),
    refetchInterval: 10000, // Poll every 10 seconds for real-time order updates
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: OrderStatus }) => {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal mengupdate status pesanan.");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateOrderPayload) => {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal membuat pesanan baru.");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
