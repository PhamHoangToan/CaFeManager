"use client";
import { useState } from "react";
import { FaBell, FaUtensils, FaReceipt, FaEllipsisH, FaUsers, FaClock } from "react-icons/fa";

export default function WaiterPage() {
  const [activeTab, setActiveTab] = useState("serving");

  const tablesServing = [
    { id: "1.1", name: "Floor 1 / 012", time: 16, total: 286000 },
    { id: "1.2", name: "Floor 2 / 008", time: 10, total: 95000 },
  ];

  const tablesPayment = [
    { id: "1.1", name: "Floor 1 / 012", time: 16, total: 286000 },
  ];

  const tablesTakeaway = [{ id: "2.3", name: "Takeaway / 001", time: 5, total: 56000 }];

  const getTables = () => {
    if (activeTab === "serving") return tablesServing;
    if (activeTab === "payment") return tablesPayment;
    if (activeTab === "takeaway") return tablesTakeaway;
    return [];
  };

  const tables = getTables();

  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("serving")}
          className={`px-4 py-1.5 rounded font-medium ${
            activeTab === "serving"
              ? "bg-[#5C2C1C] text-white"
              : "bg-white text-[#4B2E12] border border-[#4B2E12]"
          }`}
        >
          Serving ({tablesServing.length})
        </button>

        <button
          onClick={() => setActiveTab("payment")}
          className={`px-4 py-1.5 rounded font-medium ${
            activeTab === "payment"
              ? "bg-[#5C2C1C] text-white"
              : "bg-white text-[#4B2E12] border border-[#4B2E12]"
          }`}
        >
          Payment Request ({tablesPayment.length})
        </button>

        <button
          onClick={() => setActiveTab("takeaway")}
          className={`px-4 py-1.5 rounded font-medium ${
            activeTab === "takeaway"
              ? "bg-[#5C2C1C] text-white"
              : "bg-white text-[#4B2E12] border border-[#4B2E12]"
          }`}
        >
          Takeaway ({tablesTakeaway.length})
        </button>
      </div>

      {/* Table list */}
      <div className="grid grid-cols-3 gap-4">
        {tables.map((t) => {
          const isPayment = activeTab === "payment";
          const headerColor = isPayment ? "bg-[#E2704E]" : "bg-[#B7855E]";
          const bodyColor = isPayment ? "bg-[#F29C6B]" : "bg-[#CFA987]";

          return (
            <div
              key={t.id}
              className="rounded-md shadow-sm overflow-hidden flex flex-col text-sm transition-transform hover:scale-[1.02]"
            >
              {/* Header */}
              <div
                className={`${headerColor} px-4 py-2 flex justify-between items-center text-white font-semibold`}
              >
                <span>
                  {t.id} - {t.name}
                </span>
                <span className="flex items-center gap-1 text-white">
                  <FaUsers /> 2
                </span>
              </div>

              {/* Body */}
              <div className={`${bodyColor} p-4 flex flex-col gap-2 text-[#3A1F0B] flex-1`}>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <FaClock /> {t.time}&apos;
                  </span>
                  <span className="font-bold">{t.total.toLocaleString()} VND</span>
                </div>

                <div className="flex justify-around pt-2 text-lg text-[#4B2E12]">
                  <FaBell />
                  <FaReceipt />
                  <FaUtensils />
                  <FaEllipsisH />
                </div>
              </div>
            </div>
          );
        })}

        {tables.length === 0 && (
          <div className="col-span-3 text-center text-[#4B2E12] italic py-10">
            No tables found in this category.
          </div>
        )}
      </div>

      {/* Floating add button */}
      <button
        onClick={() => alert("Go to order page")}
        className="fixed bottom-6 right-6 bg-white w-16 h-16 rounded-full text-4xl text-[#4B2E12] shadow-lg flex items-center justify-center hover:bg-[#EAD4BF] transition"
      >
        +
      </button>
    </div>
  );
}
