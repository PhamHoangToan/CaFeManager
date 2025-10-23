"use client";

import { useEffect } from "react";
import registerSW from "@/lib/sw-registration";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerSW();
  }, []);

  return (
    <body className="min-h-screen bg-[#fdf8f5] text-[#3c2a1e]">
      <Header />
      <main className="p-4">{children}</main>
      <Footer />
    </body>
  );
}
