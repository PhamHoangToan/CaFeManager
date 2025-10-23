export default function ProductInfo({
  name,
  price,
  status,
}: {
  name: string;
  price: number | string;
  status?: string;
}) {
  const numericPrice = Number(price) || 0;

  return (
    <div className="space-y-2">
      <p className="uppercase text-sm text-gray-500">Coffee Loyalty</p>
      <h1 className="text-2xl font-semibold text-[#5C2C1C]">{name}</h1>

      <div className="text-sm text-gray-600">
        <span>
          Tình trạng:{" "}
          <span
            className={`${
              status === "available" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status === "available" ? "Còn hàng" : "Hết hàng"}
          </span>
        </span>
      </div>

      <p className="text-2xl text-red-600 font-bold mt-2">
        {numericPrice.toLocaleString("vi-VN")}₫
      </p>
    </div>
  );
}
