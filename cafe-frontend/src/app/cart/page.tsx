"use client";
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";
import { Cart } from "@/components/Cart/types";
import CartList from "@/components/Cart/CartList";
import CartNote from "@/components/Cart/CartNote";
import CartSummary from "@/components/Cart/CartSummary";
import { useCart } from "@/context/cart/CartContext";

export default function CartPage() {
  console.log("🧠 Context CartProvider check:", useCart());

  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState("");

  const [customerId, setCustomerId] = useState<number | null>(null);
  const {
    updateQuantity: updateContextQty,
    removeFromCart,
    setCartFromPage,
  } = useCart();

  // 👤 Lấy thông tin người dùng
  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (savedUser?.id) {
      setCustomerId(savedUser.id);
      console.log("👤 [User] Đang đăng nhập:", savedUser.id);
    } else {
      console.log("👤 [User] Guest mode");
    }
  }, []);

  // 🔑 Quản lý cartId cho guest
  const [cartId, setCartId] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("cartId") : null
  );

  useEffect(() => {
    if (!cartId && typeof window !== "undefined") {
      const newId = crypto.randomUUID();
      localStorage.setItem("cartId", newId);
      setCartId(newId);
      console.log("🆕 Tạo cartId mới:", newId);
    }
  }, [cartId]);

  // 🛒 Load giỏ hàng
  useEffect(() => {
    if (!cartId) return;

    async function loadCart() {
      try {
        console.group("🛒 [LOAD CART]");
        const query = customerId ? `customerId=${customerId}` : `cartId=${cartId}`;
        const url = `${API_URL}/cart?${query}`;
        console.log("🌐 Fetch:", url);

        const res = await fetch(url);
        if (!res.ok) throw new Error(`Fetch failed (${res.status})`);

        const data = await res.json();
        console.log("✅ [Cart] Loaded:", data);

        setCart(data);
        if (data?.items) {
          setCartFromPage(data.items);
          // 💾 Lưu local guest cart nếu chưa login
          if (!customerId)
            localStorage.setItem("guestCart", JSON.stringify(data));
        }
      } catch (err) {
        console.error("❌ [loadCart] Error:", err);
      } finally {
        console.groupEnd();
        setLoading(false);
      }
    }

    loadCart();
  }, [cartId, customerId]);

  // 🔁 Cập nhật số lượng
  async function updateQuantity(itemId: number, newQty: number) {
    if (newQty < 1) return;
    try {
      console.log("📝 Update quantity:", { itemId, newQty });
      const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const realCustomerId = savedUser?.id || null;

      // 🔹 Guest → cập nhật local
      if (!realCustomerId) {
        setCart((prev) => {
          if (!prev) return prev;
          const updated = {
            ...prev,
            items: prev.items.map((i) =>
              i.id === itemId ? { ...i, quantity: newQty } : i
            ),
          };

          // ✅ Đồng bộ context + localStorage
          setCartFromPage(updated.items);
          localStorage.setItem("guestCart", JSON.stringify(updated));
          return updated;
        });
        return;
      }

      // 🔹 Logged-in user → cập nhật API
      const body = { customerId: realCustomerId, itemId, quantity: newQty };
      const res = await fetch(`${API_URL}/cart/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Không thể cập nhật số lượng");

      setCart((prev) => {
        if (!prev) return prev;
        const updated = {
          ...prev,
          items: prev.items.map((i) =>
            i.id === itemId ? { ...i, quantity: newQty } : i
          ),
        };
        setCartFromPage(updated.items);
        return updated;
      });
    } catch (err) {
      alert("⚠️ Lỗi khi cập nhật số lượng!");
      console.error("❌ Update error:", err);
    }
  }

  // ❌ Xóa sản phẩm
  async function removeItem(itemId: number) {
    if (!confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
    try {
      console.log("🗑️ [removeItem] Xóa:", itemId);

      const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const realCustomerId = savedUser?.id || null;

      // 🔹 Nếu login → gọi API
      if (realCustomerId) {
        const res = await fetch(`${API_URL}/cart/${itemId}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Không thể xóa sản phẩm");
      }

      // ✅ Cập nhật local state + context
      setCart((prev) =>
        prev ? { ...prev, items: prev.items.filter((i) => i.id !== itemId) } : prev
      );
      removeFromCart(itemId);

      // 💾 Ghi lại localStorage (guest)
      const guestCart = JSON.parse(localStorage.getItem("guestCart") || "{}");
      if (guestCart?.items) {
        const updatedGuest = {
          ...guestCart,
          items: guestCart.items.filter((i: any) => i.id !== itemId),
        };
        localStorage.setItem("guestCart", JSON.stringify(updatedGuest));
      }
    } catch (err) {
      alert("⚠️ Lỗi khi xóa sản phẩm khỏi giỏ hàng!");
      console.error("❌ Lỗi chi tiết khi xóa:", err);
    }
  }

  const total =
    cart?.items.reduce((sum, i) => sum + Number(i.price) * i.quantity, 0) || 0;

  if (loading)
    return <p className="text-center py-10">Đang tải giỏ hàng...</p>;
  if (!cart || cart.items.length === 0)
    return (
      <p className="text-center py-10 text-gray-500">Giỏ hàng trống.</p>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-[#5C2C1C] mb-6">Giỏ hàng</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <CartList
            items={cart.items}
            onUpdateQty={updateQuantity}
            onRemove={removeItem}
          />
          <CartNote note={note} setNote={setNote} />
        </div>
        <CartSummary total={total} />
      </div>
    </div>
  );
}
