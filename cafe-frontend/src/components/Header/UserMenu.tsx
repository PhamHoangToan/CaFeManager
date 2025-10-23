"use client";
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Auth/AuthContext";

export default function UserMenu() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const handleClick = () => {
    if (!isAuthenticated) {
      router.push("/login"); // 👈 chuyển hướng đến trang đăng nhập
    } else {
      router.push("/account"); // hoặc trang tài khoản nếu đã đăng nhập
    }
  };

  return (
    <div onClick={handleClick} className="flex items-center gap-2 cursor-pointer">
      <FaUser className="text-xl text-[#e3b79e]" />
      <div className="text-sm leading-tight">
        <p className="font-semibold">Tài khoản</p>
        <p className="text-xs opacity-80">{isAuthenticated ? "Hồ sơ" : "Đăng nhập"}</p>
      </div>
    </div>
  );
}
