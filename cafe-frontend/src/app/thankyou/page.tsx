"use client";
import { useRouter } from "next/navigation";

export default function ThankYouPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fdf8f5] p-6 text-center">
      <div className="bg-white p-10 rounded-2xl shadow-lg max-w-md">
        <h1 className="text-2xl font-bold text-[#5C2C1C] mb-3">
          🎉 Đặt hàng thành công!
        </h1>
        <p className="text-gray-700 mb-6">
          Cảm ơn bạn đã mua hàng tại <span className="font-semibold">Coffee Loyalty</span>.<br />
          Chúng tôi sẽ liên hệ sớm để xác nhận đơn hàng.
        </p>

        <button
          onClick={() => router.push("/")}
          className="bg-[#a52828] text-white py-2 px-6 rounded hover:bg-[#821f1f]"
        >
          Về trang chủ
        </button>

        <button
          onClick={() => router.push("/orders")}
          className="mt-3 block w-full border border-[#a52828] text-[#a52828] py-2 rounded hover:bg-[#a52828]/10"
        >
          Xem đơn hàng của tôi
        </button>
      </div>
    </div>
  );
}
