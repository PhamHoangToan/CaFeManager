"use client";
import { FaFileExcel, FaSearch } from "react-icons/fa";

export default function RevenueReportPage() {
  return (
    <div>
      <div className="text-center font-bold text-lg py-3 border-b border-[#A27856] bg-[#CFA987]">
        REVENUE REPORT
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 px-6 py-3 bg-[#EBD6C3] border-b border-[#A27856] text-sm">
        <div>
          <label className="mr-2 font-medium">Period</label>
          <select className="border border-[#B7855E] rounded px-2 py-1">
            <option>This month</option>
            <option>Last month</option>
            <option>This quarter</option>
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
      <div className="px-6 py-4">
        <table className="w-full border-collapse text-sm text-[#3A1F0B]">
          <thead>
            <tr className="bg-[#5C2C1C] text-white">
              <th className="border border-[#A27856] px-2 py-1 w-[5%]">No</th>
              <th className="border border-[#A27856] px-2 py-1 text-left">Category</th>
              <th className="border border-[#A27856] px-2 py-1 text-right w-[20%]">Amount</th>
            </tr>
          </thead>
          <tbody>
            {[
              { type: "I", name: "Revenue (1+2+3)", value: "98,792,875 VND", bold: true },
              { type: "1", name: "Sales", value: "85,445,213 VND" },
              { type: "2", name: "Service income", value: "7,801,773 VND" },
              { type: "3", name: "Other income", value: "5,545,889 VND" },
              { type: "II", name: "Expenses (1+2)", value: "64,215,369 VND", bold: true },
              { type: "1", name: "Material cost", value: "23,192,158 VND" },
              { type: "2", name: "Labor cost", value: "35,476,257 VND" },
              { type: "3", name: "Other costs (electricity, water, tax…)", value: "5,546,954 VND" },
              { type: "III", name: "Profit", value: "34,577,506 VND", bold: true },
            ].map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-[#F4E1D2]" : "bg-[#E9CBB2]"}>
                <td className="border border-[#D1A988] px-2 py-1 text-center font-medium">{row.type}</td>
                <td className={`border border-[#D1A988] px-2 py-1 ${row.bold ? "font-semibold" : ""}`}>{row.name}</td>
                <td className={`border border-[#D1A988] px-2 py-1 text-right ${row.bold ? "font-semibold" : ""}`}>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
