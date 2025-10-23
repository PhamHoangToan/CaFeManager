"use client";
import React from "react";
import { FaTimes } from "react-icons/fa";

export default function AddExportPage() {
  const items: any[] = []; // Empty at first, will be filled after selecting menu items

  return (
    <div className="p-6 bg-[#F4E1D2] min-h-screen border border-[#B7855E] rounded-md">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#5C2C1C] text-white px-4 py-2 rounded-t-md">
        <h2 className="font-semibold text-lg">Add Export Receipt</h2>
        <FaTimes className="cursor-pointer" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 text-sm">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label>Receipt Code</label>
            <input
              className="w-full border border-[#B7855E] rounded px-2 py-1"
              defaultValue="PX0016"
            />
          </div>

          <div>
            <label>Created By</label>
            <input
              className="w-full border border-[#B7855E] rounded px-2 py-1"
              defaultValue="Vo Minh Tuan"
            />
          </div>

          <div>
            <label>Export Date</label>
            <input
              type="date"
              className="w-full border border-[#B7855E] rounded px-2 py-1"
              defaultValue="2021-11-30"
            />
          </div>

          <div>
            <label>Export Type</label>
            <select className="w-full border border-[#B7855E] rounded px-2 py-1">
              <option>Sales Export</option>
            </select>
          </div>
        </div>

        {/* Date range filter */}
        <div className="grid grid-cols-3 gap-4 items-end">
          <div>
            <label>From</label>
            <input
              type="date"
              className="w-full border border-[#B7855E] rounded px-2 py-1"
              defaultValue="2021-11-30"
            />
          </div>
          <div>
            <label>To</label>
            <input
              type="date"
              className="w-full border border-[#B7855E] rounded px-2 py-1"
              defaultValue="2021-11-30"
            />
          </div>
          <div>
            <button className="bg-[#7B3F26] text-white px-3 py-1 rounded hover:bg-[#8E4E2E]">
              Select Sold Items
            </button>
          </div>
        </div>

        {/* Detail table */}
        <table className="w-full border-collapse text-sm mt-4">
          <thead className="bg-[#CFA987]">
            <tr>
              <th className="border px-2 py-1">Item Code</th>
              <th className="border px-2 py-1">Item Name</th>
              <th className="border px-2 py-1">Unit</th>
              <th className="border px-2 py-1">Quantity</th>
              <th className="border px-2 py-1">Price</th>
              <th className="border px-2 py-1">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 italic text-gray-600">
                  No items selected.
                </td>
              </tr>
            ) : (
              items.map((i, idx) => (
                <tr key={idx} className="bg-[#F4E1D2]">
                  <td className="border px-2 py-1">{i.code}</td>
                  <td className="border px-2 py-1">{i.name}</td>
                  <td className="border px-2 py-1">{i.unit}</td>
                  <td className="border px-2 py-1">{i.qty}</td>
                  <td className="border px-2 py-1 text-right">
                    {i.price.toLocaleString()} VND
                  </td>
                  <td className="border px-2 py-1 text-right">
                    {(i.qty * i.price).toLocaleString()} VND
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Footer buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button className="bg-[#4B8F4B] text-white px-5 py-1 rounded hover:bg-[#3a7f3a]">
            Save
          </button>
          <button className="bg-[#B7855E] text-white px-5 py-1 rounded hover:bg-[#9c6b46]">
            Cancel
          </button>
          <button className="bg-[#5C2C1C] text-white px-5 py-1 rounded hover:bg-[#7B3F26]">
            Help
          </button>
        </div>
      </div>
    </div>
  );
}
