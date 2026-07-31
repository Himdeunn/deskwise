"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";

export const ContactSection: React.FC = () => {
  const { data: session } = useSession();
  const [contactSubmitted, setContactSubmitted] = useState(false);

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

        {/* FOOTER */}
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
  );
};
