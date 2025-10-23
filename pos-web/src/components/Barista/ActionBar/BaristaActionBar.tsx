"use client";
import React from "react";

export default function BaristaActionBar() {
  return (
    <div className="flex gap-3 px-6 py-2 bg-[#D7B79E] border-b border-[#A27856]">
      <button className="bg-[#C0392B] text-white px-4 py-1 rounded font-medium hover:bg-[#A93226]">
        Out of stock
      </button>
      <button className="bg-[#27AE60] text-white px-4 py-1 rounded font-medium hover:bg-[#229954]">
        Done
      </button>
    </div>
  );
}
