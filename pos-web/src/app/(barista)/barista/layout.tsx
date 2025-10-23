"use client";
import React from "react";

export default function BaristaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#EBD6C3] text-[#3A1F0B] font-sans">
      {children}
    </div>
  );
}
