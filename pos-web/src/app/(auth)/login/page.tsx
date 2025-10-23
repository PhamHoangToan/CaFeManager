"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import RoleTabs from "./RoleTabs";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("phucvu");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username && password) {
      switch (role) {
        case "phucvu":
          router.push("/phucvu");
          break;
        case "thungan":
          router.push("/thungan");
          break;
        case "admin":
          router.push("/admin");
          break;
        case "phache":
          router.push("/phache");
          break;
        default:
          alert(`Đăng nhập role: ${role}`);
      }
    } else {
      setError("Vui lòng nhập đầy đủ thông tin!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5e3d0] text-gray-800">
      <img
        src="/logo2.png"
        alt="Nopita Coffee"
        className="mb-8 w-36 h-36 object-contain drop-shadow-md"
      />

      <h2 className="text-2xl font-semibold mb-8 text-[#603813] tracking-wide">
        {role === "phucvu"
          ? "Đăng nhập phục vụ"
          : role === "thungan"
          ? "Đăng nhập thu ngân"
          : role === "admin"
          ? "Đăng nhập admin"
          : "Đăng nhập pha chế"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="w-[400px] space-y-6 bg-transparent"
      >
        <div>
          <label className="block text-left text-base text-gray-700 mb-1">
            Tên đăng nhập
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#603813]"
            placeholder="Nhập tên đăng nhập"
          />
        </div>

        <div>
          <label className="block text-left text-base text-gray-700 mb-1">
            Mật khẩu
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#603813]"
            placeholder="••••••••"
          />
        </div>

        <RoleTabs role={role} setRole={setRole} />

        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-[#603813] text-white text-lg font-semibold py-3 rounded-md hover:bg-[#4b2e12] transition shadow-md"
        >
          ĐĂNG NHẬP
        </button>
      </form>
    </div>
  );
}
