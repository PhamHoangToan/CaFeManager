"use client";
import React from "react";

type Table = {
  id: string;
  time: number;
};

export default function BaristaFooter({ tables }: { tables: Table[] }) {
  return (
    <div className="bg-[#7B3F26] text-white flex gap-2 px-6 py-2">
      {tables.map((t, i) => (
        <div
          key={i}
          className="bg-[#C0392B] text-white rounded-md px-3 py-1 text-sm flex items-center justify-between gap-2 min-w-[140px]"
        >
          <span>{t.id}</span>
          <span>{t.time}'</span>
        </div>
      ))}
    </div>
  );
}
