"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

interface Customer {
  id: number;
  fullName: string;
  email?: string;
  phone?: string;
  points: number;
}

export default function LoyaltyPage() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setLoading(true);

        // 🔑 Lấy user từ localStorage
        const savedUser = localStorage.getItem("user");
        if (!savedUser) {
          setError("⚠️ Bạn cần đăng nhập để tích điểm và xem điểm thưởng.");
          setLoading(false);
          return;
        }

        const user = JSON.parse(savedUser);
        if (!user?.id) {
          setError("⚠️ Bạn cần đăng nhập để tích điểm và xem điểm thưởng.");
          setLoading(false);
          return;
        }

        // 🌐 Gọi API lấy thông tin khách hàng
        const data = await apiFetch<Customer>(`/customers/${user.id}`);
        setCustomer(data);
      } catch (err) {
        console.error("❌ Lỗi tải dữ liệu khách hàng:", err);
        setError("Không thể tải thông tin khách hàng.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, []);

  if (loading) return <p className="p-4 text-gray-500">Đang tải...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (!customer) return null;

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow">
      <h1 className="text-2xl font-semibold text-[#5C2C1C]">
        Xin chào, {customer.fullName || "Khách hàng thân thiết"} 👋
      </h1>
      <p className="text-lg mt-3">
        🎁 Điểm thưởng hiện tại của bạn:
        <span className="font-bold text-blue-600 ml-2">{customer.points}</span>
      </p>
      <p className="text-sm text-gray-600 mt-2">
        Bạn sẽ nhận được 5% giá trị đơn hàng dưới dạng điểm thưởng.
      </p>
    </div>
  );
}
