"use client";

export default function CheckoutPayment() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-[#5C2C1C] mb-2">Thanh toán</h2>
      <label className="flex items-center gap-2 border rounded-md p-3 cursor-pointer">
        <input type="radio" name="payment" defaultChecked />
        <span>Thanh toán khi giao hàng (COD)</span>
      </label>
    </div>
  );
}
