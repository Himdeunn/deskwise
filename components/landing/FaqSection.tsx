"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export const FaqSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqItems = [
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
  ];

  return (
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
          {faqItems.map((item, idx) => (
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
  );
};
