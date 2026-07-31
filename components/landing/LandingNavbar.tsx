"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { ArrowRight, Menu, X } from "lucide-react";

export const LandingNavbar: React.FC = () => {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
  );
};
