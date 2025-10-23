"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart/CartContext"; // ✅ import context

interface CartSummaryProps {
  total: number;
}

export default function CartSummary({ total }: CartSummaryProps) {
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [companyInvoice, setCompanyInvoice] = useState(false);
  const router = useRouter();
  const { cart } = useCart(); // ✅ lấy giỏ hàng hiện tại từ context

  const handleCheckout = () => {
    try {
      const savedUser = JSON.parse(localStorage.getItem("user") || "{}");

      console.group("🧾 [HANDLE CHECKOUT LOG]");
      console.log("👤 User:", savedUser?.id ? `Đăng nhập (${savedUser.id})` : "Guest mode");
      console.log("🧺 Cart context hiện tại:", cart);

      // 👉 Hiển thị danh sách số lượng từng sản phẩm
      if (cart && cart.length > 0) {
        console.table(
          cart.map((item) => ({
            id: item.product?.id ?? item.id,
            name: item.product?.name ?? "(Không có tên)",
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity,
          }))
        );
      } else {
        console.warn("⚠️ Cart trống!");
      }

      // 🔹 Nếu là guest → đồng bộ lại giỏ hàng mới nhất trước khi chuyển trang
      if (!savedUser?.id && cart && cart.length > 0) {
        const updatedGuestCart = { id: 0, items: cart };
        localStorage.setItem("guestCart", JSON.stringify(updatedGuestCart));
        console.log("💾 [CartSummary] Đã ghi lại guestCart mới:", updatedGuestCart);
      }

      console.groupEnd();
    } catch (err) {
      console.error("❌ [CartSummary] Lỗi khi lưu guestCart hoặc log:", err);
    }

    // ✅ Điều hướng đến trang checkout
    router.push("/checkout");
  };

  return (
    <div className="border rounded-lg p-6 h-fit bg-gray-50">
      <h3 className="font-semibold text-lg mb-4 text-[#5C2C1C]">
        HẸN GIỜ NHẬN HÀNG
      </h3>

      <label className="block text-sm mb-1">Ngày nhận hàng</label>
      <input
        type="date"
        value={deliveryDate}
        onChange={(e) => setDeliveryDate(e.target.value)}
        className="w-full border rounded-md p-2 mb-3"
      />

      <label className="block text-sm mb-1">Thời gian nhận hàng</label>
      <select
        value={deliveryTime}
        onChange={(e) => setDeliveryTime(e.target.value)}
        className="w-full border rounded-md p-2 mb-3"
      >
        <option value="">Chọn thời gian</option>
        <option value="08:00-10:00">08:00 - 10:00</option>
        <option value="10:00-12:00">10:00 - 12:00</option>
        <option value="13:00-15:00">13:00 - 15:00</option>
        <option value="15:00-17:00">15:00 - 17:00</option>
      </select>

      <div className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={companyInvoice}
          onChange={(e) => setCompanyInvoice(e.target.checked)}
        />
        <label className="text-sm">Xuất hóa đơn công ty</label>
      </div>

      <div className="border-t pt-3 mt-3">
        <p className="flex justify-between font-semibold">
          <span>TỔNG CỘNG</span>
          <span className="text-red-600">{total.toLocaleString("vi-VN")}₫</span>
        </p>
        <p className="text-sm text-gray-500 mt-1">(Đã bao gồm VAT nếu có)</p>
      </div>

      <button
        onClick={handleCheckout}
        className="w-full mt-4 bg-[#a52828] text-white font-semibold py-2 rounded hover:bg-[#821f1f]"
      >
        Thanh Toán
      </button>
    </div>
  );
}
