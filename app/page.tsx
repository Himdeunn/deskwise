import React from "react";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { ContactSection } from "@/components/landing/ContactSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-[#BBD4FF] selection:text-[#0F3D91]">
      <LandingNavbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <FaqSection />
        <ContactSection />
      </main>
    </div>
  );
}
