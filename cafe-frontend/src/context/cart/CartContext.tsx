"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import { CartItem } from "@/components/Cart/types"; // ✅ Dùng cùng type với backend/API

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

  // 🧩 Đồng bộ context từ trang CartPage
  const setCartFromPage = (updatedItems: CartItem[]) => {
    setCart(updatedItems);
  };

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
  const addToCart = (item: CartItem) => {
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
  };

  // 🔁 Cập nhật số lượng
  const updateQuantity = (
    id: number,
    sizeId: number | null | undefined,
    qty: number
  ) => {
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
  };

  // ❌ Xóa sản phẩm
  const removeFromCart = (id: number, sizeId?: number | null) => {
    setCart((prev) =>
      prev.filter(
        (p) => !(p.product.id === id && p.size?.id === sizeId)
      )
    );
    console.log("🗑️ [Cart] Đã xóa sản phẩm:", { id, sizeId });
  };

  // 🧹 Xóa toàn bộ giỏ
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("guestCart");
    console.log("🧹 [Cart] Đã xóa toàn bộ giỏ hàng");
  };

  // 🔄 Cập nhật giỏ hàng từ server (khi đăng nhập)
  const setCartFromServer = (serverItems: CartItem[]) => {
    setCart(serverItems || []);
    console.log("🔄 [Cart] Đồng bộ từ server:", serverItems);
  };

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
  if (!ctx)
    throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
};
