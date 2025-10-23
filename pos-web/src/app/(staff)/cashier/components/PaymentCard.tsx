"use client";
import { FaClock, FaUsers, FaPen, FaEllipsisH } from "react-icons/fa";

type PaymentTable = {
  id: string;
  name: string;
  time: number;
  total: number;
};

export default function PaymentCard({ table }: { table: PaymentTable }) {
  return (
    <div className="rounded-md shadow-sm overflow-hidden flex flex-col text-sm transition-transform hover:scale-[1.02]">
      {/* Header */}
      <div className="bg-[#A06B50] px-4 py-2 flex justify-between items-center text-white font-semibold">
        <span>
          {table.id} - {table.name}
        </span>
        <span className="flex items-center gap-1 text-white">
          <FaUsers /> 6
        </span>
      </div>

      {/* Body */}
      <div className="bg-[#CFA987] p-4 flex flex-col gap-2 text-[#3A1F0B] flex-1">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1">
            <FaClock /> {table.time}
          </span>
          <span className="font-bold">{table.total.toLocaleString()} VND</span>
        </div>
        <div className="flex justify-around pt-2 text-lg text-[#4B2E12]">
          <FaPen />
          <FaEllipsisH />
        </div>
      </div>
    </div>
  );
}
