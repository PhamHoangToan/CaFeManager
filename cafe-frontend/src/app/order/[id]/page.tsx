"use client";
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";

export default function OrderTracking({ params }: { params: { id: string } }) {
  const [tracking, setTracking] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_URL}/orders/${params.id}/track`)
      .then((res) => res.json())
      .then(setTracking)
      .catch(console.error);
  }, [params.id]);

  if (!tracking) return <p>Đang tải trạng thái giao hàng...</p>;

  return (
    <div className="p-4 space-y-2">
      <h2 className="text-lg font-semibold text-[#5C2C1C]">Theo dõi đơn hàng</h2>
      <p>Mã vận đơn: <b>{tracking.trackingCode}</b></p>
      <p>Trạng thái: <span className="text-blue-600">{tracking.status}</span></p>
      {tracking.currentWarehouse && (
        <p>Vị trí hiện tại: {tracking.currentWarehouse}</p>
      )}
      <p>Dự kiến giao: {tracking.expectedDelivery}</p>
    </div>
  );
}
