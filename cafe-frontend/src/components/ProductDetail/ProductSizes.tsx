"use client";
import { useState } from "react";

interface ProductSize {
  id: number;
  name: string;
  price: number;
}

interface Props {
  sizes: ProductSize[];
  selected: ProductSize | null;
  onSelect: (size: ProductSize) => void;
}

export default function ProductSizes({ sizes, selected, onSelect }: Props) {
  return (
    <div className="mt-6">
      <h3 className="font-semibold text-[#5C2C1C] mb-2">Chọn size:</h3>
      <div className="flex flex-wrap gap-3">
        {sizes.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s)}
            className={`px-4 py-2 rounded-full border text-sm font-medium ${
              selected?.id === s.id
                ? "bg-[#a52828] text-white border-[#a52828]"
                : "hover:bg-gray-100"
            }`}
          >
            {s.name} – {s.price.toLocaleString("vi-VN")}₫
          </button>
        ))}
      </div>
    </div>
  );
}
