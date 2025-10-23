"use client";
import React from "react";
import {
  FaBars,
  FaWifi,
  FaQuestionCircle,
  FaPowerOff,
  FaHome,
  FaListAlt,
} from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";

export default function BaristaHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex items-center justify-between bg-[#5C2C1C] text-white px-6 py-3">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <FaBars className="text-2xl cursor-pointer" />
        <div className="flex items-center gap-3 font-semibold text-sm">
          {/* Order List */}
          <button
            onClick={() => router.push("/barista")}
            className={`flex items-center gap-1 px-3 py-1 rounded transition ${
              isActive("/barista")
                ? "bg-[#7B3F26]"
                : "hover:bg-[#7B3F26]/70 bg-transparent"
            }`}
          >
            <FaListAlt /> Order List
          </button>

          {/* Inventory Management */}
          <button
            onClick={() => router.push("/barista/inventory")}
            className={`flex items-center gap-1 px-3 py-1 rounded transition ${
              pathname.startsWith("/barista/inventory")
                ? "bg-[#7B3F26]"
                : "hover:bg-[#7B3F26]/70 bg-transparent"
            }`}
          >
            <FaHome /> Inventory Management
          </button>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4 text-lg">
        <FaWifi />
        <FaQuestionCircle />
        <FaPowerOff />
        <div className="flex items-center gap-2 text-sm">
          <span>Vo Minh Tuan</span>
        </div>
      </div>
    </div>
  );
}
