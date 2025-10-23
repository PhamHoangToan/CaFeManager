"use client";
interface Props {
  quantity: number;
  setQuantity: (val: number) => void;
}

export default function ProductQuantity({ quantity, setQuantity }: Props) {
  return (
    <div className="flex items-center gap-4 mt-6">
      <h3 className="font-semibold text-[#5C2C1C]">Số lượng:</h3>
      <div className="flex items-center border rounded-full px-3 py-1">
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
        <span className="px-3">{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>
    </div>
  );
}
