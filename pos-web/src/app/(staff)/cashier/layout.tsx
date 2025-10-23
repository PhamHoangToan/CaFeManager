"use client";
import { usePathname } from "next/navigation";
import CashierHeader from "./components/CashierHeader";

export default function CashierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const activeTab = pathname.includes("transactions")
    ? "transactions"
    : "payments";

  return (
    <div className="min-h-screen bg-[#D7B79E] text-[#3A1F0B] flex flex-col">
      <CashierHeader activeTab={activeTab} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
