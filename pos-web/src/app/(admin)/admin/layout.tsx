"use client";
import React from "react";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#D7B79E] text-[#3A1F0B] flex flex-col">
      <AdminHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}
