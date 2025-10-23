"use client";
import { Cart } from "./types";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";
import { useState, useEffect } from "react";
import { useCart } from "@/context/cart/CartContext";

interface CheckoutSummaryProps {
  cart: Cart;
  shippingFee?: number | null; // 🆕 thêm phí giao hàng
}

export default function CheckoutSummary({ cart, shippingFee }: CheckoutSummaryProps) {
  const router = useRouter();
  const { clearCart } = useCart();
  const [placing, setPlacing] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedVoucher, setAppliedVoucher] = useState<string | null>(null);

  // ✅ Đồng bộ lại giỏ hàng từ localStorage nếu user là guest
  const [localCart, setLocalCart] = useState<Cart | null>(cart);

  useEffect(() => {
    try {
      const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (!savedUser?.id) {
        const guestCart = JSON.parse(localStorage.getItem("guestCart") || "{}");
        if (guestCart?.items?.length) {
          console.log("📦 [CheckoutSummary] Load guestCart từ localStorage:", guestCart);
          setLocalCart(guestCart);
        }
      }
    } catch (err) {
      console.error("❌ [CheckoutSummary] Lỗi khi đọc guestCart:", err);
    }
  }, [cart]);

  const activeCart = localCart || cart;

  const subtotal =
    activeCart?.items.reduce((sum, i) => sum + Number(i.price) * i.quantity, 0) || 0;

  // 🧮 Tổng cộng = Tạm tính - Giảm giá + Phí giao hàng
  const total = Math.max(subtotal - discount + (shippingFee || 0), 0);

  // 🧾 Áp dụng mã giảm giá
  const handleApplyVoucher = async () => {
    if (!voucherCode.trim()) return alert("Vui lòng nhập mã giảm giá!");

    try {
      const res = await fetch(`${API_URL}/vouchers/apply/${activeCart.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: voucherCode }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Invalid voucher");
      }

      const data = await res.json();
      const amount = Number(data.discountAmount);
      if (!amount || amount <= 0) throw new Error("Voucher không hợp lệ");

      setDiscount(amount * (subtotal < 1 ? 1 : subtotal)); // nếu percent backend đã chia /100
      setAppliedVoucher(voucherCode);
      alert("🎉 Mã giảm giá đã được áp dụng!");
    } catch (err: any) {
      console.error("❌ Lỗi voucher:", err);
      alert(err.message || "Mã giảm giá không hợp lệ!");
    }
  };

  // 🛒 Đặt hàng
  const handlePlaceOrder = async () => {
    setPlacing(true);
    try {
      if (shippingFee === null) {
        alert("❌ Vui lòng chọn khu vực giao hàng hợp lệ trước khi đặt hàng!");
        setPlacing(false);
        return;
      }

      // ✅ Log dữ liệu trước khi gửi
      console.group("🧾 [HANDLE PLACE ORDER LOG]");
      console.log("📦 Cart gửi lên:", activeCart);
      console.table(
        activeCart.items.map((i) => ({
          id: i.product?.id ?? i.id,
          name: i.product?.name ?? "(Không có tên)",
          quantity: i.quantity,
          price: i.price,
          total: Number(i.price) * i.quantity,
        }))
      );
      console.groupEnd();

      const payload = {
        customerId: activeCart.customerId || null,
        note: "Đặt hàng qua website",
        totalAmount: total,
        shippingFee, // 🆕 lưu phí ship vào đơn hàng
        items: activeCart.items.map((i) => ({
          productId: i.product.id,
          quantity: i.quantity,
          price: i.price,
        })),
      };

      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      alert("✅ Đặt hàng thành công!");
      clearCart();
      localStorage.removeItem("guestCart"); // ✅ Xóa cart local sau khi đặt hàng
      router.push("/thankyou");
    } catch (err) {
      console.error("❌ [CheckoutSummary] Lỗi đặt hàng:", err);
      alert("Không thể đặt hàng, vui lòng thử lại!");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="border rounded-lg p-6 h-fit bg-gray-50">
      <h3 className="font-semibold text-lg mb-4 text-[#5C2C1C]">
        Đơn hàng ({activeCart?.items?.length || 0} sản phẩm)
      </h3>

      {/* Danh sách sản phẩm */}
      <div className="space-y-3 border-b pb-3">
        {activeCart?.items.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="w-10 h-10 object-cover rounded"
              />
              <div>
                <p className="text-sm font-medium">{item.product.name}</p>
                <p className="text-xs text-gray-500">
                  {item.size ? `${item.size.name} • ` : ""}
                  Số lượng: <span className="font-semibold">{item.quantity}</span>
                </p>
              </div>
            </div>

            <p className="text-sm font-semibold text-gray-700">
              {(Number(item.price) * item.quantity).toLocaleString("vi-VN")}₫
            </p>
          </div>
        ))}
      </div>

      {/* 🔖 Nhập mã giảm giá */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Nhập mã giảm giá"
          value={voucherCode}
          onChange={(e) => setVoucherCode(e.target.value)}
          disabled={!!appliedVoucher}
          className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          onClick={handleApplyVoucher}
          disabled={!!appliedVoucher}
          className={`${
            appliedVoucher
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white px-4 rounded`}
        >
          {appliedVoucher ? "Đã áp dụng" : "Áp dụng"}
        </button>
      </div>

      {/* Tổng cộng */}
      <div className="mt-3 space-y-1 text-sm">
        <div className="flex justify-between">
          <span>Tạm tính</span>
          <span>{subtotal.toLocaleString("vi-VN")}₫</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600 font-medium">
            <span>Giảm giá ({appliedVoucher})</span>
            <span>-{discount.toLocaleString("vi-VN")}₫</span>
          </div>
        )}

        {shippingFee !== undefined && shippingFee !== null && (
          <div className="flex justify-between text-gray-600">
            <span>Phí vận chuyển</span>
            <span>{shippingFee.toLocaleString("vi-VN")}₫</span>
          </div>
        )}

        <div className="border-t mt-2 pt-2 font-semibold flex justify-between text-[#5C2C1C]">
          <span>Tổng cộng</span>
          <span className="text-blue-700 font-bold">
            {total.toLocaleString("vi-VN")}₫
          </span>
        </div>
      </div>

      {/* Nút hành động */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => router.push("/cart")}
          className="text-sm text-blue-600 underline"
        >
          &lt; Quay về giỏ hàng
        </button>

        <button
          onClick={handlePlaceOrder}
          disabled={placing}
          className={`${
            placing ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white px-5 py-2 rounded font-semibold`}
        >
          {placing ? "Đang xử lý..." : "ĐẶT HÀNG"}
        </button>
      </div>
    </div>
  );
}
