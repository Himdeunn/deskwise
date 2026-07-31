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
  quantity: z.coerce.number().min(1, "Minimum quantity is 1").max(20, "Maximum quantity is 20"),
  specialRequest: z.string().max(300, "Notes must be 300 characters or less").optional(),
});

type NewOrderFormData = z.infer<typeof createOrderSchema>;

const SERVICE_INFO: Record<ServiceType, { title: string; price: string; desc: string }> = {
  RoomService: {
    title: "Room Service",
    price: "IDR 150,000 / set",
    desc: "Food & beverages delivered directly to your room",
  },
  Housekeeping: {
    title: "Housekeeping",
    price: "Free (Complimentary)",
    desc: "Room cleaning, linen & towel replacement",
  },
  Laundry: {
    title: "Laundry & Wash",
    price: "IDR 45,000 / package",
    desc: "Express wash and ironing service",
  },
  ExtraBed: {
    title: "Extra Bed",
    price: "IDR 350,000 / unit",
    desc: "Additional bed with blanket and pillow",
  },
  SpaMassage: {
    title: "Spa & Traditional Massage",
    price: "IDR 450,000 / session",
    desc: "In-room relaxation massage and aromatherapy",
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
      setErrorMessage(err.message || "Failed to submit the order request.");
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto space-y-6 p-5 sm:p-6">
      <div>
        <h2 className="text-lg sm:text-xl font-extrabold text-[#0F3D91]">Request Hotel Service</h2>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Choose the service you need. Hotel staff will respond to your request promptly.
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
          label="Service Type"
          options={[
            { value: "RoomService", label: "Room Service (Food & Beverages)" },
            { value: "Housekeeping", label: "Housekeeping & Room Cleaning" },
            { value: "Laundry", label: "Laundry & Clothing Wash" },
            { value: "ExtraBed", label: "Extra Bed" },
            { value: "SpaMassage", label: "Spa & Traditional Massage" },
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
          label="Quantity"
          type="number"
          min={1}
          max={20}
          error={errors.quantity?.message}
          {...register("quantity")}
        />

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">
            Special Notes (Optional)
          </label>
          <textarea
            rows={3}
            placeholder="e.g., please deliver before 7:00 PM, no ice cubes."
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
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-full sm:w-2/3"
            isLoading={createOrderMutation.isPending}
          >
            Submit Request
          </Button>
        </div>
      </form>
    </Card>
  );
};
