"use client";

import React, { useEffect, useState } from "react";
import AccountLayout from "@/components/Account/AccountLayout";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Order {
  id: number;
  orderTime: string;
  totalAmount: string;
  status: string;
  payments: { status: string; method: string }[];
}

export default function AccountOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (!storedUser?.id) {
      setLoading(false);
      return;
    }

    axios
      .get(`${API_URL}/orders/customer/${storedUser.id}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Failed to load orders:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AccountLayout>
      <h2 className="text-xl font-bold mb-4 text-gray-800">ĐƠN HÀNG CỦA BẠN</h2>

      {loading ? (
        <p className="text-gray-500 text-sm">Đang tải đơn hàng...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500 text-sm">Không có đơn hàng nào.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Đơn hàng</th>
                <th className="border p-2 text-left">Ngày</th>
                <th className="border p-2 text-left">Giá trị đơn hàng</th>
                <th className="border p-2 text-left">TT thanh toán</th>
                <th className="border p-2 text-left">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50">
                  <td className="border p-2">#{o.id}</td>
                  <td className="border p-2">
                    {new Date(o.orderTime).toLocaleString("vi-VN")}
                  </td>
                  <td className="border p-2">
                    {Number(o.totalAmount).toLocaleString("vi-VN")} ₫
                  </td>
                  <td className="border p-2">
                    {o.payments?.[0]?.status
                      ? `${o.payments[0].status} (${o.payments[0].method})`
                      : "Chưa thanh toán"}
                  </td>
                  <td className="border p-2">{o.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AccountLayout>
  );
}
