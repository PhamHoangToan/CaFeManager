"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

const banners = [
  { id: 1, image: "/banners/banner1.jpg", alt: "Cà phê truyền thống" },
  { id: 2, image: "/banners/banner2.jpg", alt: "Cà phê Culi" },
  { id: 3, image: "/banners/banner3.jpg", alt: "Cà phê Moka" },
  { id: 4, image: "/banners/banner4.jpg", alt: "Cà phê Robusta" },
];

export default function BannerSlider() {
  return (
    <div className="w-full overflow-hidden rounded-md shadow-sm">
      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
      >
        {banners.map((b) => (
          <SwiperSlide key={b.id}>
            <div className="relative w-full h-[250px] md:h-[400px]">
              <Image
                src={b.image}
                alt={b.alt}
                fill
                className="object-cover"
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
