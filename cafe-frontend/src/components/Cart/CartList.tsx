"use client";
import { CartItem } from "./types";
import CartItemRow from "./CartItemRow";

interface CartListProps {
  items: CartItem[];
  onUpdateQty: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
}

export default function CartList({ items, onUpdateQty, onRemove }: CartListProps) {
  return (
    <div>
      {items.map((item) => (
        <CartItemRow
          key={item.id}
          item={item}
          onUpdateQty={onUpdateQty}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
