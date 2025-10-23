"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function InventoryPage() {
  const router = useRouter();

  const receipts = [
    {
      date: "28/11/2021",
      code: "PN0013",
      type: "Import Receipt",
      amount: "4,943,000 VND",
      creator: "Pham Van Doan",
    },
    {
      date: "29/11/2021",
      code: "PX0016",
      type: "Export Receipt",
      amount: "6,887,000 VND",
      creator: "Pham Van Doan",
    },
  ];

  return (
    <div className="p-6 bg-[#EBD6C3] min-h-screen">
      <div className="flex items-center gap-2 mb-4">
        <select
          className="border border-[#4B2E12] text-[#4B2E12] rounded px-3 py-1 bg-white"
          onChange={(e) => {
            if (e.target.value === "import") router.push("/barista/inventory/add-import");
            if (e.target.value === "export") router.push("/barista/inventory/add-export");
            if (e.target.value === "cancel") router.push("/barista/inventory/cancel-export");
          }}
        >
          <option value="">Add</option>
          <option value="import">Import Receipt</option>
          <option value="export">Export Receipt</option>
          <option value="cancel">Cancel Material Export</option>
        </select>

        <button className="bg-white text-[#4B2E12] border border-[#4B2E12] px-4 py-1 rounded">
          Edit
        </button>
        <button className="bg-white text-[#4B2E12] border border-[#4B2E12] px-4 py-1 rounded">
          Delete
        </button>
        <button className="bg-white text-[#4B2E12] border border-[#4B2E12] px-4 py-1 rounded">
          Inventory Statistics
        </button>
      </div>

      <table className="w-full border-collapse text-sm text-[#3A1F0B] shadow-sm">
        <thead>
          <tr className="bg-[#5C2C1C] text-white">
            <th className="py-2 px-3 border border-[#8B5B40]">Date</th>
            <th className="py-2 px-3 border border-[#8B5B40]">Receipt Code</th>
            <th className="py-2 px-3 border border-[#8B5B40]">Type</th>
            <th className="py-2 px-3 border border-[#8B5B40]">Amount</th>
            <th className="py-2 px-3 border border-[#8B5B40]">Created By</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map((r, i) => (
            <tr
              key={i}
              className={i % 2 === 0 ? "bg-[#F4E1D2]" : "bg-[#E9CBB2]"}
            >
              <td className="border border-[#D1A988] px-3 py-2">{r.date}</td>
              <td className="border border-[#D1A988] px-3 py-2">{r.code}</td>
              <td className="border border-[#D1A988] px-3 py-2">{r.type}</td>
              <td className="border border-[#D1A988] px-3 py-2">{r.amount}</td>
              <td className="border border-[#D1A988] px-3 py-2">{r.creator}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
