"use client";
import { useRouter } from "next/navigation";
import {
  FaBars,
  FaWifi,
  FaQuestionCircle,
  FaPowerOff,
  FaUser,
  FaMoneyBillWave,
  FaPiggyBank,
} from "react-icons/fa";

type Props = {
  activeTab?: "payments" | "transactions";
  onChangeTab?: (tab: "payments" | "transactions") => void;
};

export default function CashierHeader({ activeTab, onChangeTab }: Props) {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between bg-[#5C2C1C] text-white px-6 py-3">
      {/* Left */}
      <div className="flex items-center gap-4">
        <FaBars className="text-2xl" />

        <button
  onClick={() => router.push("/cashier")}
  className={`flex items-center gap-2 font-semibold px-4 py-1 rounded transition ${
    activeTab === "payments" ? "bg-[#7B3F26]" : "hover:bg-[#7B3F26]/70"
  }`}
>
  <FaMoneyBillWave />
  Payments
</button>


        <button
          onClick={() => router.push("/cashier/transactions")}
          className={`flex items-center gap-2 font-semibold px-4 py-1 rounded transition ${
            activeTab === "transactions"
              ? "bg-[#7B3F26]"
              : "hover:bg-[#7B3F26]/70"
          }`}
        >
          <FaPiggyBank />
          Transactions
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5 text-lg">
        <FaWifi />
        <FaQuestionCircle />
        <FaPowerOff />
        <div className="flex items-center gap-2 text-sm">
          <span>Nguyen Thi Tu Trinh</span>
          <FaUser />
        </div>
      </div>
    </header>
  );
}
