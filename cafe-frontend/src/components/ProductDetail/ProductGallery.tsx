"use client";
import { useState, useEffect } from "react";
import { API_URL } from "@/lib/api";

interface Props {
  images?: (string | null | undefined)[];
}

export default function ProductGallery({ images = [] }: Props) {
  const [active, setActive] = useState(0);

  // 🧩 Log nhận dữ liệu
  useEffect(() => {
    console.log("[ProductGallery] received images:", images);
  }, [images]);

  // 🧩 Log ảnh đang hiển thị
  useEffect(() => {
    console.log("[ProductGallery] current active index:", active);
    console.log("[ProductGallery] current image src:", images[active]);
  }, [active, images]);

  if (!images.length)
    return (
      <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center rounded-lg">
        <span className="text-gray-500 text-sm">Không có ảnh</span>
      </div>
    );

  const fullUrl = (src?: string | null) => {
    if (!src) {
      console.warn("[ProductGallery] ⚠️ src is empty or undefined");
      return "/fallback.jpg";
    }
    const result = src.startsWith("http") ? src : `${API_URL}${src}`;
    console.log("[ProductGallery] fullUrl generated:", result);
    return result;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full h-[450px] flex items-center justify-center bg-white">
        <img
          src={fullUrl(images[active])}
          alt="Product"
          className="object-contain rounded-lg shadow-md max-h-[450px]"
          onError={() =>
            console.error("[ProductGallery] ❌ Failed to load image:", images[active])
          }
          onLoad={() =>
            console.log("[ProductGallery] ✅ Image loaded:", images[active])
          }
        />
      </div>

      <div className="flex gap-3 mt-4 flex-wrap justify-center">
        {images
          .filter((img): img is string => !!img)
          .map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`border-2 rounded-md overflow-hidden ${
                active === i ? "border-[#a52828]" : "border-transparent"
              }`}
            >
              <img
                src={fullUrl(img)}
                alt={`thumb-${i}`}
                className="w-20 h-20 object-cover"
                onError={() =>
                  console.error("[ProductGallery] ❌ Thumbnail failed:", img)
                }
                onLoad={() =>
                  console.log("[ProductGallery] ✅ Thumbnail loaded:", img)
                }
              />
            </button>
          ))}
      </div>
    </div>
  );
}
