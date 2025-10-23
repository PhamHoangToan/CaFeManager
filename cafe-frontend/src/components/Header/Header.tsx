"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch, FaUser, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { useCart } from "@/context/cart/CartContext";
import { useAuth } from "@/context/Auth/AuthContext";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { totalItems, clearCart } = useCart(); // ✅ Thêm clearCart
  const { user, isAuthenticated } = useAuth(); // ✅ Lấy logout từ AuthContext

  const navLinks = [
    { href: "/", label: "Menu" },
    { href: "/orderproduct", label: "Order" },
    { href: "/loyalty", label: "Points" },
    { href: "/vouchers", label: "Vouchers" },
  ];

  // 🔍 Tìm kiếm
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      console.log("🔎 Tìm kiếm:", search);
      // router.push(`/search?query=${encodeURIComponent(search)}`);
    }
  };

  // 👤 Click vào tài khoản
  const handleAccountClick = () => {
    if (!isAuthenticated) router.push("/login");
    else router.push("/account");
  };

  // 🚪 Đăng xuất
  const handleLogout = () => {
    if (confirm("Bạn có chắc muốn đăng xuất không?")) {
      console.log("🚪 Đăng xuất người dùng:", user);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("cartId");
      clearCart(); // ✅ Reset giỏ hàng ở context
      //logout(); // ✅ Reset auth context
      router.push("/login"); // hoặc "/" nếu bạn muốn
    }
  };

  return (
    <header className="bg-[#5C2C1C] text-white px-6 py-3 flex justify-between items-center">
      {/* 🔸 Logo */}
      <h1
        onClick={() => router.push("/")}
        className="font-semibold text-lg whitespace-nowrap cursor-pointer"
      >
        ☕ Coffee Loyalty
      </h1>

      {/* 🔸 Menu chính */}
      <nav className="flex gap-6 text-sm">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            aria-current={pathname === href ? "page" : undefined}
            className={`transition ${
              pathname === href
                ? "font-bold border-b-2 border-white"
                : "hover:opacity-80"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* 🔸 Search + Account + Cart */}
      <div className="flex items-center gap-6">
        {/* 🔍 Ô tìm kiếm */}
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-[#f3f3f3] rounded-full overflow-hidden"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Xin chào, bạn"
            className="px-4 py-2 text-gray-700 text-sm focus:outline-none bg-transparent"
          />
          <button
            type="submit"
            className="bg-[#e5d9c7] p-2 text-[#a63d2e] hover:bg-[#d9c8b1]"
          >
            <FaSearch />
          </button>
        </form>

        {/* 👤 Tài khoản */}
        <div className="relative flex items-center gap-2">
          <div
            onClick={handleAccountClick}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
          >
            <FaUser className="text-xl text-[#e3b79e]" />
            <div className="text-sm leading-tight">
              {isAuthenticated ? (
                <>
                  <p className="font-semibold">Xin chào</p>
                  <p className="text-xs opacity-80">
                    {user?.name || "Tài khoản"}
                  </p>
                </>
              ) : (
                <>
                  <p className="font-semibold">Tài khoản</p>
                  <p className="text-xs opacity-80">Đăng nhập</p>
                </>
              )}
            </div>
          </div>

          {/* 🚪 Nút Logout (chỉ hiện khi đăng nhập) */}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="ml-3 flex items-center gap-1 text-xs bg-[#74422c] px-2 py-1 rounded-md hover:bg-[#8a5b40] transition"
            >
              <FaSignOutAlt className="text-[#e3b79e]" />
              <span>Logout</span>
            </button>
          )}
        </div>

        {/* 🛒 Giỏ hàng */}
        <Link
          href="/cart"
          className="flex items-center gap-2 border border-[#d5b0a0] rounded-md px-3 py-2 relative hover:bg-[#6e3c25]"
        >
          <FaShoppingCart className="text-[#ffc107] text-lg" />
          <span className="text-sm">Giỏ hàng</span>

          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#d5c6b2] text-[#7a2820] rounded-full text-xs w-5 h-5 flex items-center justify-center font-semibold">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
