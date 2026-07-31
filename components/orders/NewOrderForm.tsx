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
import { AlertCircle } from "lucide-react";

const createOrderSchema = z.object({
  service: z.enum(["RoomService", "Housekeeping", "Laundry", "ExtraBed", "SpaMassage"] as const),
  quantity: z.coerce.number().min(1, "Jumlah minimal 1").max(20, "Maksimal 20"),
  specialRequest: z.string().max(300, "Catatan maksimal 300 karakter").optional(),
});

type NewOrderFormData = z.infer<typeof createOrderSchema>;

const SERVICE_INFO: Record<ServiceType, { title: string; price: string; desc: string }> = {
  RoomService: {
    title: "Room Service",
    price: "Rp 150.000 / set",
    desc: "Makanan & minuman diantar langsung ke kamar",
  },
  Housekeeping: {
    title: "Housekeeping",
    price: "Gratis (Complimentary)",
    desc: "Pembersihan kamar, ganti sprei & handuk",
  },
  Laundry: {
    title: "Laundry & Cuci",
    price: "Rp 45.000 / paket",
    desc: "Layanan cuci kilat pakaian & setrika",
  },
  ExtraBed: {
    title: "Extra Bed",
    price: "Rp 350.000 / unit",
    desc: "Kasur tambahan beserta selimut bantal",
  },
  SpaMassage: {
    title: "Spa & Traditional Massage",
    price: "Rp 450.000 / sesi",
    desc: "Relaksasi pijat dan aromaterapi di kamar",
  },
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
    <Card className="w-full max-w-xl mx-auto space-y-6 p-5 sm:p-6">
      <div>
        <h2 className="text-lg sm:text-xl font-extrabold text-[#0F3D91]">Request Layanan Hotel</h2>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Pilih layanan yang Anda butuhkan. Staf hotel akan segera merespons permintaan Anda.
        </p>
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-medium text-rose-700">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Select
          label="Jenis Layanan"
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
          <div className="p-4 bg-[#f0f5ff] border border-[#BBD4FF]/60 rounded-2xl space-y-1">
            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1.5">
              <span className="font-extrabold text-sm text-[#0F3D91]">{selectedInfo.title}</span>
              <span className="text-xs font-bold bg-[#BBD4FF]/40 text-[#0F3D91] px-2.5 py-0.5 rounded-full self-start xs:self-auto">
                {selectedInfo.price}
              </span>
            </div>
            <p className="text-xs text-slate-600">{selectedInfo.desc}</p>
          </div>
        )}

        <Input
          label="Jumlah / Quantity"
          type="number"
          min={1}
          max={20}
          error={errors.quantity?.message}
          {...register("quantity")}
        />

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">
            Catatan Khusus (Opsional)
          </label>
          <textarea
            rows={3}
            placeholder="Contoh: minta diantar sebelum pukul 19.00, tanpa es batu."
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-900 font-medium shadow-xs focus:border-[#1A73E8] focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 transition resize-none"
            {...register("specialRequest")}
          />
          {errors.specialRequest && (
            <p className="text-xs text-rose-600 font-medium">{errors.specialRequest.message}</p>
          )}
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-1/3"
            onClick={() => router.push("/my-orders")}
          >
            Batal
          </Button>
          <Button
            type="submit"
            className="w-full sm:w-2/3"
            isLoading={createOrderMutation.isPending}
          >
            Kirim Permintaan
          </Button>
        </div>
      </form>
    </Card>
  );
};
