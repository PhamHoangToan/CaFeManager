"use client";
import React, { useState } from "react";
import BaristaHeader from "@/components/Barista/Header/BaristaHeader";
import BaristaActionBar from "@/components/Barista/ActionBar/BaristaActionBar";
import BaristaOrderList from "@/components/Barista/OrderList/BaristaOrderList";
import BaristaFooter from "@/components/Barista/Footer/BaristaFooter";

export default function BaristaPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "inventory">("orders");

  const tables = [
    {
      id: "Table 012 - Floor 1",
      order: "1.1",
      time: 16,
      staff: "Tran Quang Minh",
      items: [
        "Black Coffee (1 cup)",
        "Green Tea Red Bean (1 cup)",
        "Flat White (1 cup)",
        "Peach Tea (3 cups)",
      ],
    },
    {
      id: "Table 008 - Floor 2",
      order: "1.2",
      time: 10,
      staff: "Tran Quang Minh",
      items: ["Cafe Latte (1 cup)", "Peach Tea (1 cup)"],
    },
  ];

  return (
    <>
      <BaristaHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "orders" && (
        <>
          <BaristaActionBar />
          <BaristaOrderList tables={tables} />
          <BaristaFooter tables={tables} />
        </>
      )}

      {activeTab === "inventory" && (
        <div className="p-6 text-center text-[#4B2E12] italic">
          📦 Inventory management screen (redirects to /barista/inventory)
        </div>
      )}
    </>
  );
}
