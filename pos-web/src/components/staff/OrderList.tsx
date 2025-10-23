"use client";

import { FaSearch, FaUser, FaUsers, FaCheck, FaMoneyBillWave, FaTimes } from "react-icons/fa";

interface OrderItem {
  name: string;
  price: number;
  qty: number;
}

export default function OrderList({
  items,
  total,
  setOrderItems,
  onSubmit,
  onPayment,
}: {
  items: OrderItem[];
  total: number;
  setOrderItems: React.Dispatch<React.SetStateAction<OrderItem[]>>;
  onSubmit: () => void;
  onPayment: () => void;
}) {
  return (
    <div className="w-[400px] bg-[#EAD4BF] border-l border-[#B7855E] flex flex-col">
      <div className="bg-[#CFA987] px-4 py-2 flex justify-between items-center">
        <span className="font-semibold">1.3 - Bàn 004/Tầng 1</span>
        <div className="flex gap-3 text-[#4B2E12]">
          <FaSearch />
          <FaUser />
          <FaUsers />
        </div>
      </div>

      {/* Order items */}
      <div className="flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <p className="text-center text-[#6B4B2B] mt-10">
            👉 Chưa có món nào trong order
          </p>
        ) : (
          items.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-3 items-center px-4 py-2 border-b border-[#CFA987]"
            >
              <span>{item.name}</span>
              <input
                type="number"
                value={item.qty}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[i].qty = Number(e.target.value);
                  setOrderItems(newItems);
                }}
                className="w-12 text-center border rounded"
              />
              <span className="text-right">
                {(item.price * item.qty).toLocaleString()} VND
              </span>
            </div>
          ))
        )}
      </div>

      {/* Total */}
      <div className="p-4 bg-[#D7B79E] flex justify-between items-center">
        <span className="font-semibold">Tổng tiền</span>
        <span className="font-bold text-lg">{total.toLocaleString()} VND</span>
      </div>

      {/* Actions */}
      <div className="flex justify-between gap-2 px-4 pb-4">
        <button
          onClick={onSubmit}
          className="flex-1 bg-white border border-[#4B2E12] text-[#4B2E12] px-4 py-2 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-[#f9e9dc]"
        >
          <FaCheck /> Gửi
        </button>

        <button
          onClick={onPayment}
          className="flex-1 bg-[#3D7C47] text-white px-4 py-2 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-[#2d6b39]"
        >
          <FaMoneyBillWave /> Thanh toán
        </button>

        <button className="flex-1 bg-[#E34E4E] text-white px-4 py-2 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-[#c93b3b]">
          <FaTimes /> Hủy
        </button>
      </div>
    </div>
  );
}
