import React from "react";

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold text-[#1A73E8] uppercase tracking-wider">
            About DeskWise
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Designed for Operational Excellence
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            DeskWise combines front desk centralized management with intelligent SLA monitoring to eliminate operational friction and elevate hotel guest experiences.
          </p>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-[#f8fafc] border border-slate-100 space-y-3 hover:shadow-md transition-shadow">
            <div className="h-10 w-10 rounded-2xl bg-[#0F3D91] text-white flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Clarity & Visibility</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Zero clutter design with instant visibility into pending guest orders, room numbers, and order requirements.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#f8fafc] border border-slate-100 space-y-3 hover:shadow-md transition-shadow">
            <div className="h-10 w-10 rounded-2xl bg-[#1A73E8] text-white flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Speed & Efficiency</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Streamlined lifecycle transitions from New to Acknowledged, In Progress, and Completed in one click.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#f8fafc] border border-slate-100 space-y-3 hover:shadow-md transition-shadow">
            <div className="h-10 w-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Intelligence & SLA</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Automated visual pulsing alerts for requests exceeding 15 minutes to guarantee swift staff response.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#f8fafc] border border-slate-100 space-y-3 hover:shadow-md transition-shadow">
            <div className="h-10 w-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              4
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Financial Audit</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Comprehensive revenue reporting with service breakdown charts and transaction ledgers for management.
            </p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-3xl bg-[#f0f5ff] border border-[#BBD4FF]/60 text-center">
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#0F3D91]">99.4%</p>
            <p className="text-xs text-slate-500 font-semibold">SLA Compliance</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#0F3D91]">&lt; 15m</p>
            <p className="text-xs text-slate-500 font-semibold">Average Response Time</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#0F3D91]">100%</p>
            <p className="text-xs text-slate-500 font-semibold">Real-Time Sync</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#0F3D91]">5.0 ★</p>
            <p className="text-xs text-slate-500 font-semibold">Guest Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
};
