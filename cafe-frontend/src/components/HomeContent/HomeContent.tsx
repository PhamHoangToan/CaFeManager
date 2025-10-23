"use client";
import React, { useEffect, useState } from "react";
import SidebarCategories from "@/components/SidebarCategories/SidebarCategories";
import BannerSlider from "@/components/BannerSlider/BannerSlider";
import { API_URL } from "@/lib/api";
import VoucherListHome from "@/components/Voucher/VoucherListHome";
interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

const HomeContent = React.memo(function HomeContentInner() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 🧠 Hàm gọi API lấy sản phẩm
  async function fetchProducts(categoryId?: number | null) {
    try {
      setLoading(true);
      const url = categoryId
        ? `${API_URL}/products/category/${categoryId}`
        : `${API_URL}/products`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setProducts(data);
      console.log("✅ [HomeContent] Loaded products:", data.length);
    } catch (err) {
      console.error("❌ [HomeContent] Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  }

  // ⚙️ Lần đầu load tất cả sản phẩm
  useEffect(() => {
    console.log("[HomeContent] mounted");
    fetchProducts();
    return () => console.log("[HomeContent] unmounted");
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-6 mt-6 max-w-7xl mx-auto px-4">
      {/* Sidebar danh mục */}
      <div className="md:w-1/4 w-full">
        <SidebarCategories />
      </div>

      {/* Banner và danh sách sản phẩm */}
      <div className="flex-1 min-h-[400px]">
        <BannerSlider />

      
      </div>
      
    </div>
  );
});

export default HomeContent;
