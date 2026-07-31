import React from "react";
import { Utensils, Sparkles, Shirt, Bed, Sparkle } from "lucide-react";

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold text-[#1A73E8] uppercase tracking-wider">
            Hotel Service Offerings
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Supported Guest Service Departments
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            Guests can request services directly from their rooms, while staff manages fulfillment seamlessly.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {/* Service 1 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4 hover:border-[#1A73E8]/40 transition-colors flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Utensils className="h-5 w-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">Room Service</h3>
              <p className="text-xs text-slate-500 font-medium">
                Food & gourmet beverages delivered directly to guest rooms.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              <span className="text-[11px] font-bold text-slate-400">Rate</span>
              <span className="text-xs font-extrabold text-[#0F3D91]">IDR 150,000</span>
            </div>
          </div>

          {/* Service 2 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4 hover:border-[#1A73E8]/40 transition-colors flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">Housekeeping</h3>
              <p className="text-xs text-slate-500 font-medium">
                Room cleaning, linen replacement, and towel replenishment.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              <span className="text-[11px] font-bold text-slate-400">Rate</span>
              <span className="text-xs font-extrabold text-emerald-600">Free</span>
            </div>
          </div>

          {/* Service 3 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4 hover:border-[#1A73E8]/40 transition-colors flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Shirt className="h-5 w-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">Laundry & Wash</h3>
              <p className="text-xs text-slate-500 font-medium">
                Express washing, dry cleaning, and garment ironing service.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              <span className="text-[11px] font-bold text-slate-400">Rate</span>
              <span className="text-xs font-extrabold text-[#0F3D91]">IDR 45,000</span>
            </div>
          </div>

          {/* Service 4 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4 hover:border-[#1A73E8]/40 transition-colors flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Bed className="h-5 w-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">Extra Bed</h3>
              <p className="text-xs text-slate-500 font-medium">
                Additional bed unit complete with pillow and blanket set.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              <span className="text-[11px] font-bold text-slate-400">Rate</span>
              <span className="text-xs font-extrabold text-[#0F3D91]">IDR 350,000</span>
            </div>
          </div>

          {/* Service 5 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4 hover:border-[#1A73E8]/40 transition-colors flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Sparkle className="h-5 w-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">Spa & Massage</h3>
              <p className="text-xs text-slate-500 font-medium">
                In-room traditional relaxation massage and aromatherapy.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              <span className="text-[11px] font-bold text-slate-400">Rate</span>
              <span className="text-xs font-extrabold text-[#0F3D91]">IDR 450,000</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
