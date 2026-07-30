import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "DeskWise — Hotel Service Management",
  description: "Panel pengelolaan layanan tamu hotel yang cepat, ramah, dan efisien.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body className="min-h-screen bg-[#f4f5f8] font-sans text-slate-900 antialiased selection:bg-purple-100 selection:text-purple-900">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
