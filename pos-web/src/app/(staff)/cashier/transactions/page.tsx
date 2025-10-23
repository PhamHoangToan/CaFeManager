"use client";

import { useState } from "react";
import ActionBar from "./components/ActionBar";
import TransactionTable from "./components/TransactionTable";
import TransactionModal from "./components/TransactionModal";

type Transaction = {
  date: string;
  code: string;
  type: string;
  amount: number;
  creator: string;
};

export default function TransactionsPage() {
  const [modalType, setModalType] = useState<"income" | "expense" | null>(null);

  const handleCreate = (type: "income" | "expense") => setModalType(type);

  const transactions: Transaction[] = [
    {
      date: "2025-10-17",
      code: "PT044",
      type: "Income",
      amount: 3943000,
      creator: "Nguyen Thi Tu Trinh",
    },
    {
      date: "2025-10-18",
      code: "PC025",
      type: "Expense",
      amount: 2287000,
      creator: "Nguyen Thi Nhu Truc",
    },
  ];

  return (
    <div className="min-h-screen bg-[#D7B79E] text-[#3A1F0B]">
      {/* Action buttons */}
      <ActionBar onCreate={handleCreate} />

      {/* Table */}
      <TransactionTable data={transactions} />

      {/* Modal */}
      {modalType && (
        <TransactionModal
          type={modalType}
          onClose={() => setModalType(null)}
        />
      )}
    </div>
  );
}
