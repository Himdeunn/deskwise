"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  Sparkles,
  Clock,
  ShieldCheck,
  TrendingUp,
  Utensils,
  Bed,
  Shirt,
  Sparkle,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Menu,
  X,
  CheckCircle2,
  Hotel,
} from "lucide-react";

export default function LandingPage() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const navHref = session?.user
    ? session.user.role === "CUSTOMER"
      ? "/my-orders"
      : "/dashboard"
    : "/login";

  const navLabel = session?.user
    ? session.user.role === "CUSTOMER"
      ? "My Orders Portal"
      : "Staff Dashboard"
    : "Sign In";

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-[#BBD4FF] selection:text-[#0F3D91]">
      {/* ── STICKY NAVBAR ── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center overflow-hidden p-1">
              <Image src="/logo.png" alt="DeskWise Logo" width={36} height={36} className="h-full w-full object-contain" />
            </div>
            <div>
              <span className="text-lg font-extrabold text-[#0F3D91] tracking-tight block leading-none">
                DeskWise
              </span>
              <span className="text-[11px] text-slate-400 font-medium leading-tight">
                Hotel Service
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-600">
            <a href="#hero" className="hover:text-[#1A73E8] transition-colors">
              Home
            </a>
            <a href="#about" className="hover:text-[#1A73E8] transition-colors">
              About
            </a>
            <a href="#services" className="hover:text-[#1A73E8] transition-colors">
              Services
            </a>
            <a href="#faq" className="hover:text-[#1A73E8] transition-colors">
              FAQ
            </a>
            <a href="#contact" className="hover:text-[#1A73E8] transition-colors">
              Contact
            </a>
          </nav>

          {/* Desktop CTA Action */}
          <div className="hidden sm:flex items-center gap-3">
            {!session?.user && (
              <Link
                href="/register"
                className="text-xs font-bold text-[#0F3D91] hover:text-[#1A73E8] px-4 py-2.5 transition-colors"
              >
                Register Guest
              </Link>
            )}
            <Link
              href={navHref}
              className="inline-flex items-center gap-2 bg-[#0F3D91] hover:bg-[#1A73E8] text-white text-xs font-extrabold px-5 py-2.5 rounded-full shadow-md shadow-blue-900/15 transition-all duration-200"
            >
              <span>{navLabel}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden h-10 w-10 rounded-xl bg-white border border-slate-200 text-slate-600 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-2">
            <nav className="flex flex-col space-y-2 text-sm font-bold text-slate-700">
              <a
                href="#hero"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-slate-50"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-slate-50"
              >
                About
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-slate-50"
              >
                Services
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-slate-50"
              >
                FAQ
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-slate-50"
              >
                Contact
              </a>
            </nav>
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href={navHref}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-[#0F3D91] text-white text-xs font-extrabold py-3 rounded-full shadow-md"
              >
                {navLabel}
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ── 1. HERO SECTION ── */}
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
              <div className="pt-6 border-t border-slate-200/60 flex items-center justify-center lg:justify-start gap-6 text-xs font-bold text-slate-500">
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

      {/* ── 2. ABOUT SECTION ── */}
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

      {/* ── 3. SERVICES SECTION ── */}
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

      {/* ── 4. FAQ SECTION ── */}
      <section id="faq" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="text-xs font-extrabold text-[#1A73E8] uppercase tracking-wider">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Everything You Need to Know
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Common inquiries regarding DeskWise operations, guest requests, and SLA tracking.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {[
              {
                q: "How do guests submit a room service request?",
                a: "Guests register or sign in to their room account, select their service (Room Service, Housekeeping, Laundry, Extra Bed, or Spa), specify the quantity and notes, and submit. The request instantly pops up on the staff dashboard.",
              },
              {
                q: "How does the 15-minute SLA breach warning work?",
                a: "Any new request that remains in 'New' status for more than 15 minutes automatically displays a pulsing red URGENT (15m+) SLA badge on both the dashboard and order management list, prompting staff to acknowledge it immediately.",
              },
              {
                q: "How are staff permissions and roles separated?",
                a: "DeskWise enforces strict Role-Based Access Control (RBAC). SUPER_ADMIN manages staff creation and system metrics; ADMIN processes guest orders and financial reports; while CUSTOMER (guests) can only access their own room requests.",
              },
              {
                q: "Can staff view financial revenue reports?",
                a: "Yes! Staff members can access the dedicated Revenue Analytics page (/dashboard/revenue) to inspect total earnings, revenue breakdown by service category, and a full transaction ledger.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-3xl bg-[#f8fafc] border border-slate-100 transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left font-extrabold text-slate-900 text-sm sm:text-base gap-4"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-[#1A73E8] shrink-0 transition-transform ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed border-t border-slate-200/60 pt-3">
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CONTACT & FOOTER SECTION ── */}
      <section id="contact" className="py-20 bg-[#f8fafc] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-extrabold text-[#1A73E8] uppercase tracking-wider">
              Get In Touch
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Front Desk & Operations Contact
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Have inquiries about DeskWise deployment or hotel assistance? Our team is available 24/7.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Contact Info Cards */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-xs flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-[#f0f5ff] text-[#0F3D91] flex items-center justify-center shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Front Desk Helpline</p>
                  <p className="text-sm font-extrabold text-slate-900">+62 (021) 555-DESK</p>
                  <p className="text-[11px] text-slate-500 font-medium">Available 24/7 for room guests</p>
                </div>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-xs flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-[#f0f5ff] text-[#1A73E8] flex items-center justify-center shrink-0">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Support Email</p>
                  <p className="text-sm font-extrabold text-slate-900">support@deskwise.com</p>
                  <p className="text-[11px] text-slate-500 font-medium">Response within 15 minutes</p>
                </div>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-xs flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-[#f0f5ff] text-[#0F3D91] flex items-center justify-center shrink-0">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Hotel HQ Location</p>
                  <p className="text-sm font-extrabold text-slate-900">Grand Hotel Tower, Level 5</p>
                  <p className="text-[11px] text-slate-500 font-medium">Jakarta, Indonesia</p>
                </div>
              </div>
            </div>

            {/* Contact Inquiry Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs">
              <h3 className="text-base font-extrabold text-slate-900 mb-4">Send Us a Direct Message</h3>

              {contactSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold text-center space-y-2">
                  <CheckCircle2 className="h-6 w-6 mx-auto text-emerald-600" />
                  <p className="text-sm font-extrabold">Thank you for getting in touch!</p>
                  <p>Our hotel support team has received your message and will respond shortly.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setContactSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Smith"
                        className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-2.5 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-2.5 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Message / Inquiry</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="How can we assist your hotel stay or system integration?"
                      className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-2.5 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#0F3D91] hover:bg-[#1A73E8] text-white text-xs font-extrabold shadow-md transition-all"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ── FOOTER ── */}
          <footer className="pt-12 border-t border-slate-200/80">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center overflow-hidden p-1">
                  <Image src="/logo.png" alt="DeskWise Logo" width={32} height={32} className="h-full w-full object-contain" />
                </div>
                <div>
                  <span className="text-base font-extrabold text-[#0F3D91]">DeskWise</span>
                  <p className="text-[11px] text-slate-500 font-medium">Smarter Desk, Faster Service.</p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs font-bold text-slate-600 flex-wrap justify-center">
                <a href="#hero" className="hover:text-[#1A73E8]">Home</a>
                <a href="#about" className="hover:text-[#1A73E8]">About</a>
                <a href="#services" className="hover:text-[#1A73E8]">Services</a>
                <a href="#faq" className="hover:text-[#1A73E8]">FAQ</a>
                <a href="#contact" className="hover:text-[#1A73E8]">Contact</a>
                <Link href={navHref} className="text-[#0F3D91] hover:underline font-extrabold">
                  {navLabel}
                </Link>
              </div>
            </div>

            <div className="py-6 border-t border-slate-200/60 text-center text-[11px] font-medium text-slate-400">
              © {new Date().getFullYear()} DeskWise Hotel Service Management. All rights reserved.
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}
