  "use client";

  import { useEffect, useState } from "react";
  import TopNav from "@/components/TopNav/TopNav";
  import HomeContent from "@/components/HomeContent/HomeContent";
  import ProductCard from "@/components/product/ProductCard";
  import { apiFetch } from "@/lib/api";
import VoucherListHome from "@/components/Voucher/VoucherListHome";

  interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl?: string;
  }

  export default function HomePage() {
    console.log("[HomePage] render");

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      async function loadProducts() {
        console.log("🚀 useEffect chạy nè");
        try {
          setLoading(true);
          const data = await apiFetch<Product[]>("/products");
          console.log("📦 Products from API:", data);
          setProducts(data);
        } catch (err) {
          console.error(err);
          setError("Không thể tải danh sách sản phẩm. Vui lòng thử lại sau!");
        } finally {
          setLoading(false);
        }
      }
      loadProducts();
    }, []);

    return (
      <div className="min-h-screen bg-[#fdf8f5]">
        {/* 🔸 Thanh top menu */}
        <TopNav />

        {/* 🔸 Khu vực banner + sidebar */}
        <div className="max-w-7xl mx-auto p-4">
          <HomeContent />
              <VoucherListHome />
          {/* 🔸 Khu vực danh sách sản phẩm */}
          <section className="mt-10">
            <h2 className="text-lg font-semibold mb-4 text-[#5C2C1C]">
              ☕ Danh sách sản phẩm
            </h2>

            {loading && (
              <p className="text-center text-gray-500 py-6">
                Đang tải sản phẩm...
              </p>
            )}

            {error && (
              <p className="text-center text-red-500 py-6">{error}</p>
            )}

            {!loading && !error && products.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}

            {!loading && !error && products.length === 0 && (
              <p className="text-center text-gray-500 py-6">
                Hiện chưa có sản phẩm nào.
              </p>
            )}
          </section>
        </div>
      </div>
    );
  }
