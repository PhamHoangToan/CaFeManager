"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  FaBars,
  FaWifi,
  FaQuestionCircle,
  FaPowerOff,
  FaUser,
} from "react-icons/fa";

export default function WaiterLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname(); // 👈 Lấy đường dẫn hiện tại

  // Hàm xác định tab đang active
  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <div className="min-h-screen flex flex-col bg-[#D7B79E] text-[#3A1F0B]">
      {/* Header */}
      <header className="flex items-center justify-between bg-[#5C2C1C] text-white px-6 py-3 shadow-md">
        <div className="flex items-center gap-4">
          <FaBars className="text-2xl" />

          {/* Nút Order */}
          <button
            onClick={() => router.push("/waiter/order")}
            className={`font-semibold px-4 py-1 rounded transition ${
              isActive("/waiter/order")
                ? "bg-[#E0A060] text-[#3A1F0B]"
                : "bg-[#7B3F26] hover:bg-[#8E4E2E]"
            }`}
          >
            Order
          </button>

          {/* Nút Return Items */}
          <button
            onClick={() => router.push("/waiter/return-items")}
            className={`font-semibold px-4 py-1 rounded transition ${
              isActive("/waiter/return-items")
                ? "bg-[#E0A060] text-[#3A1F0B]"
                : "bg-[#7B3F26] hover:bg-[#8E4E2E]"
            }`}
          >
            Return Items
          </button>
        </div>

        <div className="flex items-center gap-5 text-lg">
          <FaWifi />
          <FaQuestionCircle />
          <FaPowerOff />
          <div className="flex items-center gap-2 text-sm">
            <span>Trần Quang Minh</span>
            <FaUser />
          </div>
        </div>
      </header>

      {/* Nội dung trang */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
