"use client";

import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";

interface Category {
  id: number;
  name: string;
  description?: string;
  icon?: string;
}

export default function SidebarCategories() {
  const [open, setOpen] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/categories`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("❌ Failed to load categories:", err);
        setError("Không thể tải danh mục sản phẩm");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleClick = (catId: number | null) => {
    setActive(catId);
    router.push(
      catId === null ? "/orderproduct" : `/orderproduct?category=${catId}`
    );
  };

  return (
    <aside className="w-full md:w-64 bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 bg-[#b22222] text-white px-4 py-3 font-semibold text-base"
      >
        <FaBars className="text-lg" />
        <span>Danh mục sản phẩm</span>
      </button>

      {/* Content */}
      {open && (
        <div>
          {loading ? (
            <div className="py-4 text-center text-sm text-gray-500">
              Đang tải danh mục...
            </div>
          ) : error ? (
            <div className="py-4 text-center text-sm text-red-500">{error}</div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {/* Tất cả sản phẩm */}
              <li
                onClick={() => handleClick(null)}
                className={`flex items-center gap-3 px-4 py-2 text-sm cursor-pointer transition-colors ${
                  active === null
                    ? "bg-[#f8eaea] text-[#a52828] font-semibold"
                    : "hover:bg-[#f8eaea] hover:text-[#a52828] text-gray-800"
                }`}
              >
                <img
                  src="/icons/all.png"
                  alt="all"
                  className="w-5 h-5 object-contain"
                />
                Tất cả sản phẩm
              </li>

              {/* Danh mục động */}
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  onClick={() => handleClick(cat.id)}
                  className={`flex items-center gap-3 px-4 py-2 text-sm cursor-pointer transition-colors ${
                    active === cat.id
                      ? "bg-[#f8eaea] text-[#a52828] font-semibold"
                      : "hover:bg-[#f8eaea] hover:text-[#a52828] text-gray-800"
                  }`}
                >
                  <img
                    src={
                      cat.icon
                        ? `${API_URL}${cat.icon}` // nối domain backend
                        : "/icons/default.png"
                    }
                    alt={cat.name}
                    className="w-5 h-5 object-contain"
                  />

                  {cat.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </aside>
  );
}
