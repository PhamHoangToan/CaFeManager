"use client";
import { CartItem } from "./types";

interface CartItemRowProps {
  item: CartItem;
  onUpdateQty: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
}

export default function CartItemRow({ item, onUpdateQty, onRemove }: CartItemRowProps) {
  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center gap-4">
        <button
          onClick={() => onRemove(item.id)}
          className="text-gray-400 hover:text-red-500"
        >
          ✕
        </button>
        <img
          src={item.product.imageUrl}
          alt={item.product.name}
          className="w-20 h-20 object-cover rounded"
        />
        <div>
          <p className="font-semibold text-[#5C2C1C]">{item.product.name}</p>
          {item.size && <p className="text-sm text-gray-500">{item.size.name}</p>}
        </div>
      </div>

      <div className="text-right">
        <p className="text-red-600 font-semibold">
          {(Number(item.price) * item.quantity).toLocaleString("vi-VN")}₫
        </p>
        <div className="flex items-center justify-end gap-2 mt-2">
          <button
            onClick={() => onUpdateQty(item.id, item.quantity - 1)}
            className="px-2 py-1 border rounded"
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => onUpdateQty(item.id, item.quantity + 1)}
            className="px-2 py-1 border rounded"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
