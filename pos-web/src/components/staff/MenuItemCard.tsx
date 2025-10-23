"use client";
import React from "react";

interface MenuItemCardProps {
  item: { name: string; price: number; image: string };
  onAdd: () => void;
}

export default function MenuItemCard({ item, onAdd }: MenuItemCardProps) {
  return (
    <div
      onClick={onAdd}
      className="bg-white rounded-md shadow-md overflow-hidden cursor-pointer hover:scale-105 transition"
    >
      <div className="w-full h-40 bg-[#f8f4f1] flex items-center justify-center">
        <img
          src={item.image}
          alt={item.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <div className="p-2 text-center">
        <p className="font-medium">{item.name}</p>
        <p className="text-[#7B3F26] font-semibold text-sm">
          {item.price.toLocaleString()} VND
        </p>
      </div>
    </div>
  );
}
