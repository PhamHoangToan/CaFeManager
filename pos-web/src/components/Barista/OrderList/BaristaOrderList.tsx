"use client";
import React from "react";
import { FaBell } from "react-icons/fa";

type Table = {
  id: string;
  order: string;
  time: number;
  staff: string;
  items: string[];
};

export default function BaristaOrderList({ tables }: { tables: Table[] }) {
  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      {tables.map((table, i) => (
        <div
          key={i}
          className="bg-white rounded-md shadow border border-[#A27856] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-[#CFA987] flex justify-between items-center px-3 py-2 font-semibold">
            <span>{table.id}</span>
            <span>{table.time}'</span>
          </div>

          {/* Body */}
          <div className="p-3 text-sm flex-1">
            <p className="mb-2">
              <span className="font-medium">Order:</span> {table.order}
            </p>
            <p className="mb-3">
              <span className="font-medium">Server:</span> {table.staff}
            </p>
            <div className="flex flex-col gap-1">
              {table.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between border border-[#D1A988] rounded px-2 py-1 bg-[#F4E1D2]"
                >
                  <span>{item}</span>
                  <FaBell className="text-[#4B8F4B]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
