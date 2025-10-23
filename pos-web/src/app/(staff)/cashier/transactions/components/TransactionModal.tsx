"use client";

import { useState } from "react";
import { FaTimes, FaEye } from "react-icons/fa";

interface Row {
  id: number;
  dateTime: string;
  docCode: string;
  creator: string;
  amount: number;
}

export default function TransactionModal({
  type,
  onClose,
}: {
  type: "income" | "expense";
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    code: type === "income" ? "INC001" : "EXP001",
    creator: "Nguyen Thi Tu Trinh",
    date: new Date().toISOString().split("T")[0],
  });
  const [rows, setRows] = useState<Row[]>([]);

  const addRow = () =>
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        dateTime: form.date,
        docCode: `${form.code}-${rows.length + 1}`,
        creator: form.creator,
        amount: 0,
      },
    ]);

  const removeRow = () => setRows(rows.slice(0, -1));

  const updateRow = (id: number, field: keyof Row, value: string | number) =>
    setRows((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              [field]:
                field === "amount" ? parseFloat(value as string) || 0 : value,
            }
          : r
      )
    );

  const total = rows.reduce((s, r) => s + r.amount, 0);

  return (
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-[#F4E1D2] w-[80%] rounded-md shadow-lg border border-[#B7855E] relative">
        {/* Header */}
        <div className="flex justify-between items-center bg-[#5C2C1C] text-white px-4 py-2 rounded-t-md">
          <h2 className="font-semibold text-lg">
            {type === "income" ? "Add Income Receipt" : "Add Expense Receipt"}
          </h2>
          <button onClick={onClose} className="hover:text-gray-300">
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3">
          {/* Form */}
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <label>Receipt Code:</label>
              <input
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                className="w-full border border-[#B7855E] rounded px-2 py-1"
              />
            </div>
            <div>
              <label>Creator:</label>
              <input
                value={form.creator}
                onChange={(e) =>
                  setForm({ ...form, creator: e.target.value })
                }
                className="w-full border border-[#B7855E] rounded px-2 py-1"
              />
            </div>
            <div>
              <label>Date:</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full border border-[#B7855E] rounded px-2 py-1"
              />
            </div>
          </div>

          {/* Table */}
          <div className="mt-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#CFA987]">
                  <th className="border border-[#B7855E] px-2 py-1">✓</th>
                  <th className="border border-[#B7855E] px-2 py-1">Date Time</th>
                  <th className="border border-[#B7855E] px-2 py-1">
                    Document Code
                  </th>
                  <th className="border border-[#B7855E] px-2 py-1">Creator</th>
                  <th className="border border-[#B7855E] px-2 py-1 text-right">
                    Amount (VND)
                  </th>
                  <th className="border border-[#B7855E] px-2 py-1">View</th>
                </tr>
              </thead>
              <tbody>
                {rows.length > 0 ? (
                  rows.map((r) => (
                    <tr key={r.id}>
                      <td className="border border-[#D1A988] text-center">
                        <input type="checkbox" />
                      </td>
                      <td className="border border-[#D1A988] px-2 py-1 text-center">
                        <input
                          type="datetime-local"
                          value={r.dateTime}
                          onChange={(e) =>
                            updateRow(r.id, "dateTime", e.target.value)
                          }
                          className="border rounded px-1 w-[95%]"
                        />
                      </td>
                      <td className="border border-[#D1A988] px-2 py-1 text-center">
                        <input
                          type="text"
                          value={r.docCode}
                          onChange={(e) =>
                            updateRow(r.id, "docCode", e.target.value)
                          }
                          className="border rounded px-1 w-[95%]"
                        />
                      </td>
                      <td className="border border-[#D1A988] px-2 py-1 text-center">
                        <input
                          type="text"
                          value={r.creator}
                          onChange={(e) =>
                            updateRow(r.id, "creator", e.target.value)
                          }
                          className="border rounded px-1 w-[95%]"
                        />
                      </td>
                      <td className="border border-[#D1A988] px-2 py-1 text-right">
                        <input
                          type="number"
                          value={r.amount}
                          onChange={(e) =>
                            updateRow(r.id, "amount", e.target.value)
                          }
                          className="border rounded px-1 w-[90px] text-right"
                        />{" "}
                        VND
                      </td>
                      <td className="border border-[#D1A988] px-2 py-1 text-center">
                        <FaEye className="inline text-[#4B2E12]" />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center italic py-2">
                      No rows yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Footer */}
            <div className="flex justify-between items-center mt-2">
              <div className="flex gap-2">
                <button
                  onClick={addRow}
                  className="bg-[#B7855E] text-white px-3 py-1 rounded hover:bg-[#9c6b46]"
                >
                  + Add Row
                </button>
                <button
                  onClick={removeRow}
                  className="bg-[#B7855E] text-white px-3 py-1 rounded hover:bg-[#9c6b46]"
                >
                  − Remove Row
                </button>
              </div>
              <div className="font-semibold">
                Total:{" "}
                <span className="text-[#4B2E12]">
                  {total.toLocaleString()} VND
                </span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button className="bg-[#4B8F4B] text-white px-5 py-1 rounded hover:bg-[#3a7f3a]">
              Save
            </button>
            <button
              onClick={onClose}
              className="bg-[#B7855E] text-white px-5 py-1 rounded hover:bg-[#9c6b46]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
