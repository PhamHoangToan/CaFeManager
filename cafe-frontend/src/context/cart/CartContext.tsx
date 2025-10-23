"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { CartItem } from "@/components/Cart/types";

type CartContextType = {
  cart: CartItem[];
  totalItems: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, sizeId?: number | null) => void;
  clearCart: () => void;
  updateQuantity: (id: number, sizeId: number | null | undefined, qty: number) => void;
  setCartFromServer: (serverItems: CartItem[]) => void;
  setCartFromPage: (updatedItems: CartItem[]) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // 🧩 Đồng bộ context từ trang CartPage (được gọi ngoài render, an toàn)
  const setCartFromPage = useCallback((updatedItems: CartItem[]) => {
    if (!Array.isArray(updatedItems)) return;
    setCart((prev) => {
      // tránh setState trùng lặp nếu dữ liệu giống hệt
      const same =
        JSON.stringify(prev.map((i) => ({ id: i.id, qty: i.quantity }))) ===
        JSON.stringify(updatedItems.map((i) => ({ id: i.id, qty: i.quantity })));
      if (same) return prev;
      console.log("🧠 [CartContext] Cập nhật từ trang CartPage:", updatedItems);
      return updatedItems;
    });
  }, []);

  // 💾 Khởi tạo giỏ hàng từ localStorage (guest)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("guestCart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCart(parsed);
          console.log("🛒 [Cart] Khởi tạo từ localStorage:", parsed);
        }
      }
    } catch (err) {
      console.error("❌ [Cart] Lỗi khi đọc localStorage:", err);
    }
  }, []);

  // 💾 Lưu lại mỗi khi giỏ hàng đổi
  useEffect(() => {
    try {
      localStorage.setItem("guestCart", JSON.stringify(cart));
    } catch (err) {
      console.error("❌ [Cart] Lỗi khi lưu localStorage:", err);
    }
  }, [cart]);

  // ➕ Thêm sản phẩm vào giỏ
  const addToCart = useCallback((item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (p) => p.product.id === item.product.id && p.size?.id === item.size?.id
      );
      if (existing) {
        const updated = prev.map((p) =>
          p.product.id === item.product.id && p.size?.id === item.size?.id
            ? { ...p, quantity: p.quantity + item.quantity }
            : p
        );
        console.log("🟡 [Cart] Cập nhật số lượng:", updated);
        return updated;
      } else {
        console.log("🟢 [Cart] Thêm sản phẩm mới:", item);
        return [...prev, item];
      }
    });
  }, []);

  // 🔁 Cập nhật số lượng
  const updateQuantity = useCallback(
    (id: number, sizeId: number | null | undefined, qty: number) => {
      if (qty <= 0) {
        removeFromCart(id, sizeId);
        return;
      }
      setCart((prev) =>
        prev.map((p) =>
          p.product.id === id && p.size?.id === sizeId
            ? { ...p, quantity: qty }
            : p
        )
      );
    },
    []
  );

  // ❌ Xóa sản phẩm
  const removeFromCart = useCallback((id: number, sizeId?: number | null) => {
    setCart((prev) =>
      prev.filter((p) => !(p.product.id === id && p.size?.id === sizeId))
    );
    console.log("🗑️ [Cart] Đã xóa sản phẩm:", { id, sizeId });
  }, []);

  // 🧹 Xóa toàn bộ giỏ
  const clearCart = useCallback(() => {
    console.group("🧹 [CartContext.clearCart]");
    console.log("Trước khi clear:", cart);
    setCart([]);
  localStorage.removeItem("cartId");
  localStorage.removeItem("guestCart"); 
    console.log("Đã gọi setCart([]) và xoá guestCart khỏi localStorage");
    console.groupEnd();
  }, [cart]);

  // 🔄 Cập nhật giỏ hàng từ server (khi đăng nhập)
  const setCartFromServer = useCallback((serverItems: CartItem[]) => {
    setCart(serverItems || []);
    console.log("🔄 [Cart] Đồng bộ từ server:", serverItems);
  }, []);

  // 🧮 Tổng số lượng item
  const totalItems = useMemo(
    () => cart.reduce((sum, i) => sum + i.quantity, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        setCartFromServer,
        setCartFromPage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
};
