"use client";
import {
  FaUsers,
  FaClock,
  FaBell,
  FaReceipt,
  FaUtensils,
  FaEllipsisH,
} from "react-icons/fa";

interface TableProps {
  t: { id: string; name: string; time: number; total: number };
  isThanhToan?: boolean;
}

export default function TableCard({ t, isThanhToan }: TableProps) {
  const headerColor = isThanhToan ? "bg-[#E2704E]" : "bg-[#B7855E]";
  const bodyColor = isThanhToan ? "bg-[#F29C6B]" : "bg-[#CFA987]";

  return (
    <div className="rounded-md shadow-sm overflow-hidden flex flex-col text-sm transition-transform hover:scale-[1.02]">
      <div className={`${headerColor} px-4 py-2 flex justify-between items-center text-white font-semibold`}>
        <span>{t.id} - {t.name}</span>
        <span className="flex items-center gap-1"><FaUsers /> 2</span>
      </div>
      <div className={`${bodyColor} p-4 flex flex-col gap-2 text-[#3A1F0B] flex-1`}>
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1"><FaClock /> {t.time}&apos;</span>
          <span className="font-bold">{t.total.toLocaleString()} VND</span>
        </div>
        <div className="flex justify-around pt-2 text-lg text-[#4B2E12]">
          <FaBell /> <FaReceipt /> <FaUtensils /> <FaEllipsisH />
        </div>
      </div>
    </div>
  );
}
