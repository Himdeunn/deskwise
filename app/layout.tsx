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
  description: "Fast, responsive, and intuitive hotel guest service management panel.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="min-h-screen bg-[#f8fafc] font-sans text-slate-900 antialiased selection:bg-[#BBD4FF] selection:text-[#0F3D91]">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
