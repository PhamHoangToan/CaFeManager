"use client";

import VoucherList from "@/components/Voucher/VoucherList";

export default function VouchersPage() {
  return (
    <div className="min-h-screen bg-[#fdf8f5] p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#b22222]">
        🎁 Khuyến Mãi & Ưu Đãi Hiện Có
      </h1>
      <VoucherList />
    </div>
  );
}
