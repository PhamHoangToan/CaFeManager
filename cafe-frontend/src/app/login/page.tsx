"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Auth/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";

import axios, { AxiosError } from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🟢 Đăng nhập bằng Google
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { access_token } = tokenResponse;
        const googleInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        );

        const { email, name, picture } = googleInfo.data;
        const res = await axios.post(`${API_URL}/auth/google-kh`, {
          email,
          name,
          photoUrl: picture,
        });

        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        router.push("/");
      } catch (err) {
        console.error("Google login failed:", err);
        setError("Đăng nhập Google thất bại, vui lòng thử lại!");
      }
    },
    onError: () => setError("Đăng nhập Google bị hủy hoặc thất bại!"),
  });

  // 🧩 Đăng nhập bằng email & mật khẩu (gọi backend thật)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ Email và Mật khẩu");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { token, user } = res.data;

      if (!token || !user) {
        throw new Error("Phản hồi không hợp lệ từ máy chủ");
      }

      // ✅ Lưu vào localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      router.push("/");
    } catch (err: unknown) {
      console.error("Login error:", err);
       if (axios.isAxiosError(err)) {
    const axiosError = err as AxiosError<{ message?: string }>;
    const msg =
      axiosError.response?.data?.message ||
      "Đăng nhập thất bại. Vui lòng kiểm tra thông tin!";
    setError(msg);
  } else {
    setError("Có lỗi xảy ra. Vui lòng thử lại!");
  }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdf8f5] px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 border border-gray-100">
        <h1 className="text-2xl font-bold text-center text-[#5C2C1C] mb-2">
          ĐĂNG NHẬP TÀI KHOẢN
        </h1>

        <p className="text-center text-gray-600 mb-6 text-sm">
          Bạn chưa có tài khoản?{" "}
          <button
            onClick={() => router.push("/register")}
            className="text-[#a63d2e] font-medium hover:underline"
          >
            Đăng ký tại đây
          </button>
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-[#5C2C1C] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Mật khẩu <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-[#5C2C1C] focus:outline-none"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <p className="text-xs text-right text-gray-600">
            Quên mật khẩu? Nhấn vào{" "}
            <a href="/forgot-password" className="text-[#a63d2e] hover:underline">
              đây
            </a>
          </p>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "opacity-70" : "hover:bg-[#d9c8b1]"
            } bg-[#e5d9c7] text-[#5C2C1C] font-semibold py-2 rounded-full transition`}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p className="mb-3">Hoặc đăng nhập bằng</p>
          <div className="flex justify-center gap-3">
            {/* ⚪ Facebook (chỉ giao diện) */}
            <button className="bg-[#3b5998] text-white px-4 py-2 rounded flex items-center gap-2 hover:opacity-90">
              <span className="text-sm font-medium">Facebook</span>
            </button>

            {/* 🔴 Google */}
            <button
              onClick={() => handleGoogleLogin()}
              className="bg-[#db4a39] text-white px-4 py-2 rounded flex items-center gap-2 hover:opacity-90"
            >
              <span className="text-sm font-medium">Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
