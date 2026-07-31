"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Sparkles, CheckCircle2, Clock, ShieldCheck } from "lucide-react";

export const HeroSection: React.FC = () => {
  const { data: session } = useSession();

  const navHref = session?.user
    ? session.user.role === "CUSTOMER"
      ? "/my-orders"
      : "/dashboard"
    : "/login";

  return (
    <section id="hero" className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f5ff] border border-[#BBD4FF]/60 text-[#0F3D91] text-xs font-extrabold">
              <Sparkles className="h-4 w-4 text-[#1A73E8]" />
              <span>Smarter Desk, Faster Service</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Elevating Guest Satisfaction Through{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F3D91] via-[#1A73E8] to-[#1A73E8]">
                Seamless Hospitality
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              DeskWise connects hotel staff and room guests in real-time — processing service requests, tracking SLA response times, and auditing financial performance effortlessly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href={session?.user ? navHref : "/register"}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0F3D91] hover:bg-[#1A73E8] text-white font-extrabold text-xs shadow-lg shadow-blue-900/20 transition-all text-center"
              >
                {session?.user ? "Go to Portal" : "Register Guest Account"}
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 font-extrabold text-xs transition-all shadow-xs text-center"
              >
                Staff Portal Sign In
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-slate-200/60 flex items-center justify-center lg:justify-start gap-6 text-xs font-bold text-slate-500 flex-wrap">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Real-time Tracking</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-amber-500" />
                <span>15m SLA Monitor</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#1A73E8]" />
                <span>Role-Based Access</span>
              </div>
            </div>
          </div>

          {/* Right Mockup Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 space-y-4 transform hover:scale-[1.02] transition-transform">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-[#f0f5ff] text-[#0F3D91] font-bold text-xs flex items-center justify-center">
                    DW
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-slate-900">Live Service Monitor</p>
                    <p className="text-[10px] text-slate-400 font-medium">Hotel Staff Dashboard</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                  Active System
                </span>
              </div>

              {/* Sample Live Order Card 1 */}
              <div className="p-3.5 rounded-2xl bg-[#f8fafc] border border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold px-2.5 py-0.5 bg-[#f0f5ff] text-[#0F3D91] rounded-full">
                    Room 412
                  </span>
                  <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full text-[10px] animate-pulse">
                    URGENT (18m)
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900">Spa & Massage (1×)</span>
                  <span className="font-extrabold text-[#0F3D91]">IDR 450,000</span>
                </div>
              </div>

              {/* Sample Live Order Card 2 */}
              <div className="p-3.5 rounded-2xl bg-[#f8fafc] border border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold px-2.5 py-0.5 bg-[#f0f5ff] text-[#0F3D91] rounded-full">
                    Room 501
                  </span>
                  <span className="font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-full text-[10px]">
                    In Progress
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900">Laundry & Wash (3×)</span>
                  <span className="font-extrabold text-[#0F3D91]">IDR 120,000</span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="p-3 bg-[#f0f5ff] rounded-2xl border border-[#BBD4FF]/50 flex items-center justify-between text-xs font-bold text-[#0F3D91]">
                <span>Total Today Revenue</span>
                <span className="font-extrabold text-sm">IDR 2,450,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
