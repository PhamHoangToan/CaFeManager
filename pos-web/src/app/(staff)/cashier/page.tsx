"use client";
import { useState } from "react";
import PaymentCard from "./components/PaymentCard";

export default function CashierPage() {
  const [activeTab, setActiveTab] = useState<"payments" | "transactions">(
    "payments"
  );

  const pendingPayments = [
    { id: "1.1", name: "Floor 1 / Table 012", time: 16, total: 286000 },
  ];
  const takeaways: any[] = [];
  const tables = activeTab === "payments" ? pendingPayments : takeaways;

  return (
    <div className="flex-1 bg-[#D7B79E] text-[#3A1F0B]">
      {/* Sub Tabs */}
      <div className="flex gap-2 px-6 py-3 bg-[#D7B79E]">
        <button className="bg-[#5C2C1C] text-white px-4 py-1.5 rounded font-medium">
          Pending ({pendingPayments.length})
        </button>
        <button className="bg-white text-[#4B2E12] px-4 py-1.5 rounded border border-[#4B2E12] font-medium">
          Takeaway ({takeaways.length})
        </button>
      </div>

      {/* Content */}
      <div className="p-6 grid grid-cols-3 gap-4">
        {tables.map((t) => (
          <PaymentCard key={t.id} table={t} />
        ))}
        {tables.length === 0 && (
          <div className="col-span-3 text-center text-[#4B2E12] italic py-10">
            No pending payments.
          </div>
        )}
      </div>
    </div>
  );
}
