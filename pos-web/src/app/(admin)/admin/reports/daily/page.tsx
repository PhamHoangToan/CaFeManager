"use client";
import { FaFileExcel, FaSearch } from "react-icons/fa";

export default function DailyReportPage() {
  return (
    <div>
      <div className="text-center font-bold text-lg py-3 border-b border-[#A27856] bg-[#CFA987]">
        DAILY SALES REPORT
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 px-6 py-3 bg-[#EBD6C3] border-b border-[#A27856] text-sm">
        <div>
          <label className="mr-2 font-medium">Period</label>
          <select className="border border-[#B7855E] rounded px-2 py-1">
            <option>This month</option>
            <option>Last month</option>
          </select>
        </div>

        <div>
          <label className="mr-2 font-medium">From</label>
          <input
            type="date"
            defaultValue="2021-11-01"
            className="border border-[#B7855E] rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="mr-2 font-medium">To</label>
          <input
            type="date"
            defaultValue="2021-11-30"
            className="border border-[#B7855E] rounded px-2 py-1"
          />
        </div>

        <button className="flex items-center gap-1 bg-[#5C2C1C] text-white px-3 py-1 rounded hover:bg-[#7B3F26]">
          <FaSearch /> Fetch Data
        </button>

        <button className="flex items-center gap-1 bg-[#4B8F4B] text-white px-3 py-1 rounded hover:bg-[#3a7f3a]">
          <FaFileExcel /> Export to Excel
        </button>
      </div>

      {/* Table */}
      <div className="px-6 py-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm text-[#3A1F0B]">
          <thead>
            <tr className="bg-[#5C2C1C] text-white">
              <th className="border border-[#A27856] px-2 py-1">Date</th>
              <th className="border border-[#A27856] px-2 py-1 text-right">Total</th>
              <th className="border border-[#A27856] px-2 py-1 text-right">Sales</th>
              <th className="border border-[#A27856] px-2 py-1 text-right">Services</th>
              <th className="border border-[#A27856] px-2 py-1 text-right">Other</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["2021-11-01", "3,288,788 VND", "3,088,788 VND", "200,000 VND", "0 VND"],
              ["2021-11-02", "3,122,011 VND", "3,022,011 VND", "100,000 VND", "0 VND"],
            ].map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-[#F4E1D2]" : "bg-[#E9CBB2]"}>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`border border-[#D1A988] px-2 py-1 ${
                      j === 0 ? "text-left font-medium" : "text-right"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
