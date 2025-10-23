"use client";

import React, { useEffect, useState } from "react";
import AccountLayout from "@/components/Account/AccountLayout";
import axios from "axios";
import AddressModal from "./AddressModal";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Address {
  id: number;
  fullName: string;
  phone: string;
  company?: string;
  province: string;
  district: string;
  ward: string;
  addressLine: string;
  isDefault: boolean;
}

export default function AddressPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Address | null>(null);

  const fetchAddresses = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.id) return;
    const res = await axios.get(`${API_URL}/addresses/customer/${user.id}`);
    setAddresses(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <AccountLayout>
      <h2 className="text-xl font-bold mb-4 text-gray-800">ĐỊA CHỈ CỦA BẠN</h2>

      <button
        onClick={() => setSelected({} as Address)}
        className="bg-[#a63d2e] text-white px-4 py-2 rounded hover:bg-[#8d2e22] mb-4"
      >
        Thêm địa chỉ
      </button>

      {loading ? (
        <p>Đang tải...</p>
      ) : addresses.length === 0 ? (
        <p className="text-gray-500">Chưa có địa chỉ nào.</p>
      ) : (
        addresses.map((a) => (
          <div key={a.id} className="border-t pt-4 mb-4 text-sm text-gray-700">
            <p>
              <strong>Họ tên:</strong> {a.fullName}{" "}
              {a.isDefault && (
                <span className="text-green-600 ml-2">✔ Địa chỉ mặc định</span>
              )}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {a.addressLine}, {a.ward}, {a.district},{" "}
              {a.province}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {a.phone}
            </p>
            <button
              className="text-blue-600 hover:underline mt-2"
              onClick={() => setSelected(a)}
            >
              Chỉnh sửa địa chỉ
            </button>
          </div>
        ))
      )}

      {selected && (
        <AddressModal
          address={selected}
          onClose={() => setSelected(null)}
          onSaved={fetchAddresses}
        />
      )}
    </AccountLayout>
  );
}
