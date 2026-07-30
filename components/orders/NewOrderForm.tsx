"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useCreateOrder } from "@/features/orders/hooks/useOrders";
import { ServiceType } from "@/types/order";
import { Utensils, Sparkles, Bed, Sparkle, Shirt } from "lucide-react";

const createOrderSchema = z.object({
  service: z.enum(["RoomService", "Housekeeping", "Laundry", "ExtraBed", "SpaMassage"] as const),
  quantity: z.coerce.number().min(1, "Jumlah minimal 1").max(20, "Maksimal 20"),
  specialRequest: z.string().max(300, "Catatan maksimal 300 karakter").optional(),
});

type NewOrderFormData = z.infer<typeof createOrderSchema>;

const SERVICE_INFO: Record<ServiceType, { title: string; price: string; desc: string }> = {
  RoomService: { title: "Room Service", price: "Rp 150.000 / set", desc: "Makanan & minuman diantar langsung ke kamar" },
  Housekeeping: { title: "Housekeeping", price: "Gratis (Complimentary)", desc: "Pembersihan kamar, ganti sprei & handuk" },
  Laundry: { title: "Laundry & Cuci", price: "Rp 45.000 / paket", desc: "Layanan cuci kilat pakaian & setrika" },
  ExtraBed: { title: "Extra Bed", price: "Rp 350.000 / unit", desc: "Kasur tambahan beserta selimut bantal" },
  SpaMassage: { title: "Spa & Traditional Massage", price: "Rp 450.000 / sesi", desc: "Relaksasi pijat dan aromaterapi di kamar" },
};

export const NewOrderForm: React.FC = () => {
  const router = useRouter();
  const createOrderMutation = useCreateOrder();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewOrderFormData>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      service: "RoomService",
      quantity: 1,
      specialRequest: "",
    },
  });

  const selectedService = watch("service");
  const selectedInfo = SERVICE_INFO[selectedService];

  const onSubmit = async (data: NewOrderFormData) => {
    setErrorMessage(null);
    try {
      await createOrderMutation.mutateAsync(data);
      router.push("/my-orders?created=true");
    } catch (err: any) {
      setErrorMessage(err.message || "Gagal mengirimkan permintaan order.");
    }
  };

  return (
    <Card className="max-w-xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Request Layanan Hotel Baru</h2>
        <p className="text-xs text-slate-500 mt-1">
          Pilih jenis layanan yang Anda butuhkan. Tim staf hotel akan segera memproses permintaan Anda.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-xs font-medium text-rose-700">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Select
          label="Pilih Jenis Layanan"
          options={[
            { value: "RoomService", label: "Room Service (Makanan & Minuman)" },
            { value: "Housekeeping", label: "Housekeeping & Kebersihan Kamar" },
            { value: "Laundry", label: "Laundry & Cuci Pakaian" },
            { value: "ExtraBed", label: "Extra Bed (Kasur Tambahan)" },
            { value: "SpaMassage", label: "Spa & Pijat Tradisional" },
          ]}
          error={errors.service?.message}
          {...register("service")}
        />

        {selectedInfo && (
          <div className="p-4 bg-sky-50/70 border border-sky-200/80 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-sm font-semibold text-sky-900">
              <span>{selectedInfo.title}</span>
              <span className="text-xs font-bold bg-sky-200/80 px-2 py-0.5 rounded-md text-sky-900">
                {selectedInfo.price}
              </span>
            </div>
            <p className="text-xs text-sky-700">{selectedInfo.desc}</p>
          </div>
        )}

        <Input
          label="Jumlah / Quantity (Pax)"
          type="number"
          min={1}
          max={20}
          error={errors.quantity?.message}
          {...register("quantity")}
        />

        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700">
            Catatan Khusus / Special Request (Opsional)
          </label>
          <textarea
            rows={3}
            placeholder="contoh: Minta es batu ekstra dan diantar sebelum jam 19.00"
            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-xs focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
            {...register("specialRequest")}
          />
          {errors.specialRequest && (
            <p className="text-xs text-rose-600">{errors.specialRequest.message}</p>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            className="w-1/3"
            onClick={() => router.push("/my-orders")}
          >
            Batal
          </Button>
          <Button
            type="submit"
            className="w-2/3"
            isLoading={createOrderMutation.isPending}
          >
            Kirim Permintaan
          </Button>
        </div>
      </form>
    </Card>
  );
};
