"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/context/Auth/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function RegisterPage() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🟢 Google đăng nhập (tùy chọn)
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { access_token } = tokenResponse;
        const googleInfo = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${access_token}` },
        });

        const { email, name, picture } = googleInfo.data;
        console.log("👉 GOOGLE USER INFO:", googleInfo.data);
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
        console.error(err);
        setError("Đăng ký bằng Google thất bại, vui lòng thử lại!");
      }
    },
    onError: () => setError("Đăng ký bằng Google thất bại!"),
    prompt: "select_account",
  });

  // 🧩 Xử lý đăng ký thường
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { fullName, phone, email, password } = formData;
    if (!fullName || !phone || !email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin bắt buộc");
      return;
    }

    try {
      // Gửi dữ liệu lên backend
      const res = await axios.post(`${API_URL}/auth/register`, formData);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      router.push("/login");
    } catch (err) {
      console.error(err);
      setError("Đăng ký thất bại. Vui lòng thử lại!");
    }
  };

  return (
    <div className="bg-[#fdf8f5] min-h-screen flex flex-col items-center">
      {/* Breadcrumb */}
      <div className="w-full bg-[#f9f9f9] text-sm text-gray-600 px-6 py-2 border-b">
        Trang chủ / <span className="text-black font-medium">Đăng ký tài khoản</span>
      </div>

      <div className="max-w-xl w-full px-6 mt-10">
        <h1 className="text-center text-2xl font-bold mb-3 text-[#5C2C1C]">
          ĐĂNG KÝ TÀI KHOẢN
        </h1>

        <p className="text-center text-gray-700 mb-6">
          Bạn đã có tài khoản?{" "}
          <a href="/login" className="text-[#5C2C1C] hover:underline">
            Đăng nhập tại đây
          </a>
        </p>

        <h2 className="text-center font-semibold text-[#5C2C1C] mb-4">
          THÔNG TIN CÁ NHÂN
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-sm mb-1">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
              name="fullName"
              placeholder="Họ và tên"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#5C2C1C]"
            />
          </div>

          <div>
            <label className="block font-medium text-sm mb-1">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              name="phone"
              placeholder="Số điện thoại"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#5C2C1C]"
            />
          </div>

          <div>
            <label className="block font-medium text-sm mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#5C2C1C]"
            />
          </div>

          <div>
            <label className="block font-medium text-sm mb-1">
              Mật khẩu <span className="text-red-500">*</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#5C2C1C]"
            />
          </div>

          {error && <p className="text-center text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#e5d9c7] text-[#5C2C1C] font-semibold py-2 rounded-full hover:bg-[#d9c8b1] transition"
          >
            Đăng ký
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-700">
          Hoặc đăng nhập bằng
        </div>

        <div className="flex justify-center gap-3 mt-3">
          <button className="bg-[#3b5998] text-white px-4 py-2 rounded flex items-center gap-2 hover:opacity-90">
            <span className="text-sm">Facebook</span>
          </button>
          <button
            onClick={() => handleGoogleLogin()}
            className="bg-[#db4a39] text-white px-4 py-2 rounded flex items-center gap-2 hover:opacity-90"
          >
            <span className="text-sm">Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
