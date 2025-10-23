"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  FaBars,
  FaWifi,
  FaQuestionCircle,
  FaPowerOff,
  FaGift,
  FaUser,
  FaChartBar,
  FaUtensils,
  FaChevronDown,
} from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";

export default function AdminHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [showReportMenu, setShowReportMenu] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (reportRef.current && !reportRef.current.contains(event.target as Node)) {
        setShowReportMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex items-center justify-between bg-[#5C2C1C] text-white px-6 py-3 relative">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <FaBars className="text-2xl cursor-pointer" />
        <div className="flex items-center gap-3 font-semibold text-sm relative">
          {/* Menu */}
          <button
            onClick={() => router.push("/admin")}
            className={`flex items-center gap-1 px-3 py-1 rounded transition 
              ${
                isActive("/admin")
                  ? "bg-[#7B3F26]"
                  : "hover:bg-[#7B3F26]/70 bg-transparent"
              }`}
          >
            <FaUtensils /> Menu
          </button>

          {/* Staff */}
          <button
            onClick={() => router.push("/admin/staff")}
            className={`flex items-center gap-1 px-3 py-1 rounded transition 
              ${
                isActive("/admin/staff")
                  ? "bg-[#7B3F26]"
                  : "hover:bg-[#7B3F26]/70 bg-transparent"
              }`}
          >
            <FaUser /> Staff
          </button>

          {/* Reports with dropdown menu */}
          <div className="relative" ref={reportRef}>
            <button
              onClick={() => setShowReportMenu((prev) => !prev)}
              className={`flex items-center gap-1 px-3 py-1 rounded transition 
                ${
                  pathname.startsWith("/admin/reports")
                    ? "bg-[#7B3F26]"
                    : "hover:bg-[#7B3F26]/70 bg-transparent"
                }`}
            >
              <FaChartBar /> Reports <FaChevronDown className="text-xs ml-1" />
            </button>

            {/* Dropdown menu */}
            {showReportMenu && (
              <div className="absolute left-0 top-[110%] bg-white text-[#3A1F0B] border border-[#B7855E] rounded-md shadow-md w-40 z-50">
                <button
                  onClick={() => {
                    setShowReportMenu(false);
                    router.push("/admin/reports/revenue");
                  }}
                  className={`block w-full text-left px-3 py-2 hover:bg-[#EAD4BF] ${
                    isActive("/admin/reports/revenue") ? "bg-[#F4E1D2]" : ""
                  }`}
                >
                  Revenue Report
                </button>
                <button
                  onClick={() => {
                    setShowReportMenu(false);
                    router.push("/admin/reports/daily");
                  }}
                  className={`block w-full text-left px-3 py-2 hover:bg-[#EAD4BF] ${
                    isActive("/admin/reports/daily") ? "bg-[#F4E1D2]" : ""
                  }`}
                >
                  Daily Report
                </button>
              </div>
            )}
          </div>

          {/* Promotions */}
          <button
            onClick={() => router.push("/admin/promotions")}
            className={`flex items-center gap-1 px-3 py-1 rounded transition 
              ${
                isActive("/admin/promotions")
                  ? "bg-[#7B3F26]"
                  : "hover:bg-[#7B3F26]/70 bg-transparent"
              }`}
          >
            <FaGift /> Promotions
          </button>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 text-lg">
        <FaWifi />
        <FaQuestionCircle />
        <FaPowerOff />
        <div className="flex items-center gap-2 text-sm">
          <span>(Admin) Vo Thi Thuy Hoa</span>
          <FaUser />
        </div>
      </div>
    </div>
  );
}
