"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { API_URL } from "@/lib/api";
import SidebarCategories from "@/components/SidebarCategories/SidebarCategories";
import ProductCard from "@/components/product/ProductCard";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
}

export default function OrderPage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const url = categoryId
          ? `${API_URL}/products/category/${categoryId}`
          : `${API_URL}/products`;

        console.log("📦 Fetching products from:", url);

        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("❌ Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [categoryId]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
      {/* 🧭 Sidebar bên trái */}
      <div className="w-full md:w-1/4">
        <SidebarCategories />
      </div>

      {/* 🛍️ Danh sách sản phẩm bên phải */}
      <div className="flex-1">
        <h1 className="text-xl font-semibold mb-4 text-[#5C2C1C]">
          {categoryId
            ? `Sản phẩm thuộc danh mục #${categoryId}`
            : "Tất cả sản phẩm"}
        </h1>

        {loading && (
          <p className="text-center text-gray-500 py-8">
            Đang tải sản phẩm...
          </p>
        )}

        {!loading && products.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            Không có sản phẩm nào trong danh mục này.
          </p>
        )}

        {!loading && products.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
