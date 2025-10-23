"use client";
import { useEffect, useState } from "react";

interface Props {
  province: string;
  onFeeChange?: (fee: number | null) => void;
}

export default function CheckoutShipping({ province, onFeeChange }: Props) {
  const [fee, setFee] = useState<number | null>(null);
  const [status, setStatus] = useState("Chưa chọn địa chỉ");

  useEffect(() => {
    if (!province) {
      setFee(null);
      setStatus("Vui lòng chọn tỉnh/thành để tính phí vận chuyển");
      return;
    }

    // ⚙️ Giả lập phí theo tỉnh (bạn có thể thay bằng API thực)
    const lowerProvince = province.toLowerCase();
    let shipping = 0;
    if (lowerProvince.includes("hồ chí minh") || lowerProvince.includes("ho chi minh")) {
      shipping = 20000;
      setStatus("Nội thành TP.HCM");
    } else if (lowerProvince.includes("hà nội")) {
      shipping = 25000;
      setStatus("Khu vực Hà Nội");
    } else if (lowerProvince.includes("đồng nai") || lowerProvince.includes("bình dương")) {
      shipping = 30000;
      setStatus("Cận tỉnh");
    } else if (
      lowerProvince.includes("cần thơ") ||
      lowerProvince.includes("đà nẵng") ||
      lowerProvince.includes("bắc giang") ||
      lowerProvince.includes("thừa thiên huế")
    ) {
      shipping = 40000;
      setStatus("Liên tỉnh");
    } else {
      shipping = 0;
      setStatus("❌ Không thể giao hàng đến khu vực này");
    }

    setFee(shipping > 0 ? shipping : null);
    onFeeChange?.(shipping > 0 ? shipping : null);
  }, [province]);

  return (
    <div>
      <h2 className="text-lg font-semibold text-[#5C2C1C] mb-2">Vận chuyển</h2>
      {fee !== null ? (
        <div className="bg-green-50 border rounded-md p-3 text-sm">
          <p className="text-gray-700">
            {status} — Phí vận chuyển:{" "}
            <span className="font-semibold text-green-600">
              {fee.toLocaleString("vi-VN")}₫
            </span>
          </p>
        </div>
      ) : (
        <div className="bg-red-50 border rounded-md p-3 text-sm text-red-600">
          {status}
        </div>
      )}
    </div>
  );
}
