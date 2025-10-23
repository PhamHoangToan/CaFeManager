"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { API_URL } from "@/lib/api";
import ProductGallery from "@/components/ProductDetail/ProductGallery";
import ProductInfo from "@/components/ProductDetail/ProductInfo";
import ProductSizes from "@/components/ProductDetail/ProductSizes";
import ProductQuantity from "@/components/ProductDetail/ProductQuantity";
import ProductActions from "@/components/ProductDetail/ProductActions";

type ProductSize = {
  id: number;
  name: string;
  price: number;
};

type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  imageUrl: string;
  images?: string[];
  status?: string;
  sizes?: ProductSize[];
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_URL}/products/${id}`);
        const data: Product = await res.json();
        console.log("[ProductDetailPage] product data:", data);

        // ✅ Nếu có size → chọn size đầu tiên mặc định
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }

        setProduct(data);
      } catch (err) {
        console.error("❌ Lỗi tải chi tiết sản phẩm:", err);
      }
    }
    load();
  }, [id]);

  if (!product) return <p className="text-center py-10">Đang tải...</p>;

  const images = Array.isArray(product.images)
    ? product.images
    : [product.imageUrl];

  // ✅ Ưu tiên giá của size đầu tiên (hoặc size đang chọn)
  const basePrice =
    selectedSize?.price ??
    (product.sizes && product.sizes[0]
      ? product.sizes[0].price
      : product.price);

  const totalPrice = basePrice * quantity;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Ảnh + thông tin */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ProductGallery images={images} />

        <div>
          <ProductInfo
            name={product.name}
            price={totalPrice}
            status={product.status}
          />

          {/* Chọn size */}
          {product.sizes && product.sizes.length > 0 && (
            <ProductSizes
              sizes={product.sizes}
              selected={selectedSize}
              onSelect={setSelectedSize}
            />
          )}

          {/* Số lượng */}
          <ProductQuantity quantity={quantity} setQuantity={setQuantity} />

          <div className="mt-8">
           <ProductActions
  productId={product.id}
  name={product.name}
  size={selectedSize?.name}
  price={basePrice}
  quantity={quantity}
  imageUrl={product.imageUrl}
/>

          </div>
        </div>
      </div>

      {/* Mô tả sản phẩm */}
      {product.description && (
        <div className="mt-16 border-t pt-8">
          <h2 className="text-lg font-semibold text-[#5C2C1C] mb-3">
            Mô tả sản phẩm
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {product.description}
          </p>
        </div>
      )}
    </div>
  );
}
