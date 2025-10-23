"use client";

import { useState } from "react";
import { FaChevronDown, FaPlusCircle, FaArrowCircleDown } from "react-icons/fa";

export default function ActionBar({
  onCreate,
}: {
  onCreate: (type: "income" | "expense") => void;
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex gap-3 px-6 py-3 bg-[#CFA987] border-b border-[#A27856] relative">
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-1 bg-white text-[#4B2E12] border border-[#4B2E12] px-4 py-1.5 rounded font-medium hover:bg-[#EAD4BF]"
        >
          Add <FaChevronDown className="text-xs" />
        </button>

        {showMenu && (
          <div className="absolute top-[105%] left-0 bg-white border border-[#B7855E] rounded-md shadow-md w-44 z-10">
            <button
              onClick={() => {
                setShowMenu(false);
                onCreate("income");
              }}
              className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-[#EAD4BF]"
            >
              <FaPlusCircle className="text-green-600" /> Create Income
            </button>
            <button
              onClick={() => {
                setShowMenu(false);
                onCreate("expense");
              }}
              className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-[#EAD4BF]"
            >
              <FaArrowCircleDown className="text-red-600" /> Create Expense
            </button>
          </div>
        )}
      </div>

      <button className="bg-white text-[#4B2E12] border border-[#4B2E12] px-4 py-1.5 rounded font-medium hover:bg-[#EAD4BF]">
        Edit
      </button>
      <button className="bg-white text-[#4B2E12] border border-[#4B2E12] px-4 py-1.5 rounded font-medium hover:bg-[#EAD4BF]">
        Delete
      </button>
    </div>
  );
}
