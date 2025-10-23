"use client";
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";

interface Voucher {
  id: number;
  code: string;
  description?: string;
  discountType: string;
  discountValue: number;
  minOrderValue?: number;
}

export default function VoucherListHome() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVouchers() {
      const url = `${API_URL}/vouchers`;
      console.group("🎫 [VoucherListHome] Debug log");
      console.log("🌐 API_URL:", API_URL);
      console.log("📦 Gọi API đến:", url);

      try {
        const res = await fetch(url);
        console.log("📡 Response status:", res.status);

        if (!res.ok) {
          const text = await res.text();
          console.error("❌ Response không OK:", text);
          throw new Error(`Fetch failed (${res.status})`);
        }

        const data = await res.json();
        console.log("✅ Dữ liệu nhận được:", data);

        if (!Array.isArray(data)) {
          console.warn("⚠️ Response không phải dạng array!", data);
        }

        setVouchers(data);
      } catch (err) {
        console.error("🚨 [VoucherListHome] Lỗi tải voucher:", err);
      } finally {
        console.groupEnd();
        setLoading(false);
      }
    }

    loadVouchers();
  }, []);

  if (loading) return <p className="text-center py-4">Đang tải khuyến mãi...</p>;
  if (!vouchers.length)
    return <p className="text-center py-4 text-gray-500">Chưa có khuyến mãi.</p>;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-[#b22222] mb-4 text-center">
        🎁 Ưu Đãi Dành Cho Bạn
      </h2>

      <div className="flex flex-wrap justify-center gap-4">
        {vouchers.map((v) => (
          <div
            key={v.id}
            className="flex items-center bg-white rounded-lg shadow border border-gray-200 overflow-hidden max-w-sm w-full sm:w-[300px]"
          >
            {/* Phần trái màu đỏ */}
            <div className="bg-[#b22222] text-white px-4 py-6 flex flex-col justify-center items-center w-24 text-center">
              <span className="text-xs font-medium">TẶNG</span>
              <span className="text-2xl font-bold mt-1">
                {v.discountType === "percent"
                  ? `${v.discountValue}%`
                  : `${v.discountValue.toLocaleString("vi-VN")}K`}
              </span>
            </div>

            {/* Phần nội dung bên phải */}
            <div className="flex-1 px-4 py-3">
              <p className="text-sm font-semibold text-gray-800">
                NHẬP MÃ: {v.code}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                - Giảm{" "}
                {v.discountType === "percent"
                  ? `${v.discountValue}%`
                  : `${v.discountValue.toLocaleString("vi-VN")}K`}{" "}
                cho hóa đơn từ{" "}
                {v.minOrderValue
                  ? `${v.minOrderValue.toLocaleString("vi-VN")}K`
                  : "0K"}
              </p>

              <div className="flex items-center justify-between mt-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(v.code);
                    alert("Đã sao chép mã!");
                  }}
                  className="bg-[#b22222] text-white text-xs px-3 py-1.5 rounded hover:bg-[#8b1a1a]"
                >
                  Sao chép mã
                </button>
                <button className="text-xs text-blue-600 hover:underline">
                  Điều kiện
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
