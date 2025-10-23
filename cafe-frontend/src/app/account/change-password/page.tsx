"use client";

import { useState } from "react";
import AccountLayout from "@/components/Account/AccountLayout";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Mật khẩu xác nhận không khớp");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (!storedUser?.id) {
      setMessage("Không tìm thấy người dùng, vui lòng đăng nhập lại");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put(`${API_URL}/customers/${storedUser.id}/change-password`, {
        oldPassword,
        newPassword,
      });
      setMessage(res.data.message || "Đổi mật khẩu thành công!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
  console.error("Change password failed:", err);

  if (axios.isAxiosError(err)) {
    setMessage(err.response?.data?.message || "Đổi mật khẩu thất bại!");
  } else {
    setMessage("Đổi mật khẩu thất bại!");
  }
}
 finally {
      setLoading(false);
    }
  };

  return (
    <AccountLayout>
      <h2 className="text-xl font-bold mb-4 text-gray-800">ĐỔI MẬT KHẨU</h2>
      <p className="text-gray-600 mb-6 text-sm">
        Để đảm bảo tính bảo mật, vui lòng đặt mật khẩu với ít nhất 8 kí tự.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium mb-1">
            Mật khẩu cũ <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Nhập mật khẩu cũ"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-[#a63d2e] outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Mật khẩu mới <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nhập mật khẩu mới"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-[#a63d2e] outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Xác nhận lại mật khẩu <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Nhập lại mật khẩu mới"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-[#a63d2e] outline-none"
          />
        </div>

        {message && (
          <p
            className={`text-sm ${
              message.includes("thành công") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-[#a63d2e] text-white font-semibold px-6 py-2 rounded hover:bg-[#8d2e22] transition disabled:opacity-60"
        >
          {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
        </button>
      </form>
    </AccountLayout>
  );
}
