"use client";
import { useState } from "react";
import { apiFetch } from "@/lib/api";

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export default function OrderPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [note, setNote] = useState("");

  async function handleSubmit() {
    await apiFetch("/orders", {
      method: "POST",
      body: JSON.stringify({
        customerId: 1, // tạm
        items: cart.map((c) => ({
          productId: c.id,
          quantity: c.quantity,
          price: c.price,
        })),
        note,
      }),
    });
    alert("Đặt hàng thành công!");
  }

  return (
    <main className="p-4">
      <h1 className="text-xl font-semibold mb-2">Giỏ hàng</h1>
      {cart.map((item) => (
        <div key={item.id}>
          {item.name} x {item.quantity}
        </div>
      ))}
      <textarea
        placeholder="Ghi chú..."
        className="border w-full p-2 mt-2"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="mt-4 bg-brown-600 text-white px-4 py-2 rounded"
      >
        Xác nhận đặt hàng
      </button>
    </main>
  );
}
