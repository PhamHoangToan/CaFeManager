"use client";
import { useEffect, useState } from "react";
import CheckoutInfo from "@/components/Checkout/CheckoutInfo";
import CheckoutShipping from "@/components/Checkout/CheckoutShipping";
import CheckoutPayment from "@/components/Checkout/CheckoutPayment";
import CheckoutSummary from "@/components/Checkout/CheckoutSummary";
import { API_URL } from "@/lib/api";

export default function CheckoutPage() {
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [cartId, setCartId] = useState<string | null>(null);
  const [province, setProvince] = useState<string>(""); // 🆕 province được chọn
  const [shippingFee, setShippingFee] = useState<number | null>(null); // 🆕 phí ship

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const guestCart = localStorage.getItem("cartId");
    if (user?.id) setCustomerId(user.id);
    if (guestCart) setCartId(guestCart);
  }, []);

  useEffect(() => {
    async function fetchCart() {
      try {
        if (!customerId && !cartId) return;
        const query = customerId
          ? `customerId=${customerId}`
          : `cartId=${cartId}`;
        const res = await fetch(`${API_URL}/cart?${query}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setCart(data);
      } catch (err) {
        console.error("❌ [Checkout] Lỗi tải giỏ hàng:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
  }, [customerId, cartId]);

  if (loading) return <p className="text-center py-10">Đang tải giỏ hàng...</p>;
  if (!cart || !cart.items?.length)
    return <p className="text-center py-10 text-gray-500">Giỏ hàng trống.</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6">
      {/* 🟤 Cột 1 */}
      <div className="md:col-span-3 lg:col-span-4 border rounded-lg p-4 bg-white shadow-sm">
        <CheckoutInfo onProvinceChange={setProvince} />
      </div>

      {/* 🟣 Cột 2 */}
      <div className="md:col-span-3 lg:col-span-4 space-y-4">
        <div className="border rounded-lg p-4 bg-white shadow-sm">
          <CheckoutShipping
            province={province}
            onFeeChange={setShippingFee}
          />
        </div>
        <div className="border rounded-lg p-4 bg-white shadow-sm">
          <CheckoutPayment />
        </div>
      </div>

      {/* 🟢 Cột 3 */}
      <div className="md:col-span-3 lg:col-span-4">
        <CheckoutSummary cart={cart} shippingFee={shippingFee} />
      </div>
    </div>
  );
}
