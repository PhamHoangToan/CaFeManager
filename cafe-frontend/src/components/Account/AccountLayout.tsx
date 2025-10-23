"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menu = [
    { label: "Thông tin tài khoản", href: "/account" },
    { label: "Đơn hàng của bạn", href: "/account/orders" },
    { label: "Đổi mật khẩu", href: "/account/change-password" },
    { label: "Sổ địa chỉ (0)", href: "/account/address" },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 mt-10 px-4 md:px-12">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 border-r border-gray-200 pr-6">
        <h2 className="text-xl font-bold mb-2 text-gray-800">TRANG TÀI KHOẢN</h2>
        <p className="mb-6">
          Xin chào, <span className="font-semibold text-[#a63d2e]">Toàn Hoàng</span> !
        </p>

        <ul className="space-y-2 text-sm">
          {menu.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${
                  pathname === item.href ? "text-[#a63d2e] font-medium" : "text-gray-700"
                } hover:text-[#a63d2e] transition`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
