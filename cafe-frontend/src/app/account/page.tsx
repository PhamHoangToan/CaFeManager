"use client";

import React, { useEffect, useState } from "react";
import AccountLayout from "@/components/Account/AccountLayout";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Customer {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  points: number;
  createdAt: string;
}

export default function AccountInfoPage() {
  const [user, setUser] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (!storedUser?.id) return;

    axios
      .get(`${API_URL}/customers/${storedUser.id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Failed to load user:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <AccountLayout>
        <p className="text-gray-500 text-sm">Đang tải thông tin...</p>
      </AccountLayout>
    );

  if (!user)
    return (
      <AccountLayout>
        <p className="text-red-500 text-sm">Không tìm thấy thông tin tài khoản.</p>
      </AccountLayout>
    );

  return (
    <AccountLayout>
      <h2 className="text-xl font-bold mb-4 text-gray-800">THÔNG TIN TÀI KHOẢN</h2>

      <div className="space-y-2 text-sm text-gray-700">
        <p>
          <strong>Họ tên:</strong> {user.fullName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Số điện thoại:</strong> {user.phone}
        </p>
        <p>
          <strong>Điểm tích lũy:</strong> {user.points}
        </p>
        <p>
          <strong>Ngày tạo tài khoản:</strong>{" "}
          {new Date(user.createdAt).toLocaleDateString("vi-VN")}
        </p>
      </div>
    </AccountLayout>
  );
}
