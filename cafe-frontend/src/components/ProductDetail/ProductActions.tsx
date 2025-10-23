"use client";
import { useState, useEffect } from "react";
import { API_URL } from "@/lib/api";
import { useCart } from "@/context/cart/CartContext";
import { useRouter } from "next/navigation";

interface ProductActionsProps {
  productId: number;
  name: string;
  sizeId?: number;
  size?: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export default function ProductActions({
  productId,
  name,
  sizeId,
  size,
  price,
  quantity,
  imageUrl,
}: ProductActionsProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cartId, setCartId] = useState<string | null>(null);

  // 🔑 Khi load component, đảm bảo luôn có cartId cho khách vãng lai
  useEffect(() => {
    if (typeof window === "undefined") return;

    let storedCartId = localStorage.getItem("cartId");
    if (!storedCartId) {
      storedCartId = crypto.randomUUID();
      localStorage.setItem("cartId", storedCartId);
      console.log("🆕 [Cart] Tạo cartId mới cho khách:", storedCartId);
    } else {
      console.log("🔑 [Cart] cartId hiện tại:", storedCartId);
    }
    setCartId(storedCartId);
  }, []);

  // 🛒 Xử lý thêm vào giỏ hàng
  const handleAddToCart = async () => {
    try {
      setLoading(true);

      // 🧠 Lấy user hiện tại nếu có
      const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const realCustomerId = savedUser?.id || null;
      const cartKey = localStorage.getItem("cartId");

      // 🧾 Tạo body gửi backend
      const body = realCustomerId
        ? {
            customerId: realCustomerId,
            productId,
            sizeId: sizeId || null,
            quantity,
            price,
          }
        : {
            cartId: cartKey,
            productId,
            sizeId: sizeId || null,
            quantity,
            price,
          };

      console.group("🛒 [Add To Cart]");
      console.log("📦 API URL:", `${API_URL}/cart/add`);
      console.log("👤 User:", realCustomerId ? `Login (ID=${realCustomerId})` : `Guest (cartId=${cartKey})`);
      console.log("🧩 Body gửi:", body);

      // 🚀 Gọi API thêm vào giỏ
      const res = await fetch(`${API_URL}/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const rawText = await res.text();
      console.log("📡 Response status:", res.status);
      console.log("📦 Raw response:", rawText);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const result = JSON.parse(rawText);
      console.log("✅ [AddToCart] Giỏ hàng cập nhật:", result);

      // 🛍️ Đồng bộ lại context để UI cập nhật ngay
      addToCart({
        id: productId,
        name,
        size,
        price,
        quantity,
        imageUrl,
      });

      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2500);
    } catch (err) {
      console.error("❌ [AddToCart] Lỗi thêm vào giỏ hàng:", err);
      alert("Thêm vào giỏ hàng thất bại, vui lòng thử lại.");
    } finally {
      console.groupEnd();
      setLoading(false);
    }
  };

  // 🧾 Chuyển sang giỏ hàng
  const handleViewCart = () => {
    setShowPopup(false);
    router.push("/cart");
  };

  // 💳 Thanh toán ngay (thêm rồi chuyển trang)
const handleCheckoutNow = async () => {
  try {
    await handleAddToCart();
    // 🔁 Sau khi thêm xong, điều hướng đến trang thanh toán
    router.push("/checkout"); 
  } catch (err) {
    console.error("❌ [CheckoutNow] Lỗi khi chuyển trang:", err);
    alert("Không thể chuyển đến trang thanh toán!");
  }
};

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-4">
      {/* Nút thêm vào giỏ */}
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="flex-1 bg-[#a52828] text-white font-semibold py-2 px-6 rounded hover:bg-[#821f1f] disabled:opacity-60"
      >
        {loading ? "Đang thêm..." : "+ Thêm vào giỏ"}
      </button>

      {/* Nút thanh toán ngay */}
      <button
        onClick={handleCheckoutNow}
        disabled={loading}
        className="flex-1 bg-white border border-[#a52828] text-[#a52828] font-semibold py-2 px-6 rounded hover:bg-[#a52828]/10 disabled:opacity-60"
      >
        Thanh toán ngay
      </button>

      {/* Popup thông báo */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[9999]">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center animate-fade-in">
            <div className="text-green-600 font-medium mb-3">
              ✅ Đã thêm vào giỏ hàng!
            </div>
            {imageUrl && (
              <img
                src={imageUrl}
                alt={name}
                className="w-16 h-16 object-cover mx-auto rounded-md"
              />
            )}
            <p className="font-semibold mt-2">{name}</p>
            {size && <p className="text-sm text-gray-600">Size: {size}</p>}
            <p className="text-red-600 font-bold mt-1">
              {(price * quantity).toLocaleString("vi-VN")}₫
            </p>
            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={handleViewCart}
                className="px-4 py-2 rounded border border-gray-300"
              >
                Xem giỏ hàng
              </button>
              <button className="px-4 py-2 rounded bg-[#a52828] text-white">
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
