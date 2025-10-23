"use client";
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";

interface Voucher {
  id: number;
  code: string;
  description?: string;
  discountType: string;
  discountValue: number;
  imageUrl?: string;
  status: string;
}

export default function VoucherList() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchVouchers() {
    try {
      const res = await fetch(`${API_URL}/vouchers`);
      const data = await res.json();
      setVouchers(data);
    } catch (err) {
      console.error("❌ Failed to load vouchers:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchVouchers();
  }, []);

  if (loading) return <p className="text-center">Đang tải khuyến mãi...</p>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {vouchers.map((v) => (
          <div
            key={v.id}
            className="flex flex-col bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition"
          >
            {/* Ảnh voucher */}
            {v.imageUrl && (
              <img
                src={`${API_URL}${v.imageUrl}`}
                alt={v.code}
                className="w-full h-40 object-cover"
              />
            )}

            {/* Nội dung */}
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-lg font-semibold text-[#b22222]">
                {v.code}
              </h3>

              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {v.description || "Ưu đãi hấp dẫn dành cho bạn!"}
              </p>

              <div className="mt-2 font-bold text-gray-700">
                {v.discountType === "percent"
                  ? `Giảm ${v.discountValue}%`
                  : `Giảm ${v.discountValue}₫`}
              </div>

              <div className="flex items-center justify-between mt-auto pt-4">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(v.code);
                    alert("Đã sao chép mã!");
                  }}
                  className="bg-[#b22222] text-white px-4 py-2 rounded-md hover:bg-[#8b1a1a] transition"
                >
                  Sao chép mã
                </button>
                <span
                  className={`text-sm font-medium ${
                    v.status === "active" ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {v.status === "active" ? "Đang diễn ra" : "Hết hạn"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
