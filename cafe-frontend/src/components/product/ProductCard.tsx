"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();

  const goToDetail = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <div
      onClick={goToDetail}
      className="bg-white shadow-md rounded-lg p-3 hover:shadow-lg transition flex flex-col cursor-pointer"
    >
      <img
        src={
          product.imageUrl?.startsWith("http")
            ? product.imageUrl
            : `${API_URL}${product.imageUrl}`
        }
        alt={product.name}
        className="w-full h-48 object-cover rounded-md"
      />

      <h3 className="font-semibold text-lg text-gray-800 mt-2">
        {product.name}
      </h3>
      <p className="text-[#5C2C1C] text-sm mb-2">
        {product.price.toLocaleString("vi-VN")} ₫
      </p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          goToDetail();
        }}
        className="mt-auto bg-[#5C2C1C] text-white py-2 px-3 rounded hover:bg-[#4a2317]"
      >
        + Thêm
      </button>
    </div>
  );
}
