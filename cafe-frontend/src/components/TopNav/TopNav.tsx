"use client";

import { FaExchangeAlt, FaPhoneAlt, FaNewspaper } from "react-icons/fa";

export default function TopNav() {
  return (
    <div className="bg-[#a52828] text-white flex items-center justify-center gap-10 py-2 text-sm font-medium">
      <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
        <FaExchangeAlt />
        <span>Chính sách đổi trả</span>
      </div>
      <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
        <FaPhoneAlt />
        <span>Liên hệ</span>
      </div>
      <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
        <FaNewspaper />
        <span>Tin tức</span>
      </div>
    </div>
  );
}
