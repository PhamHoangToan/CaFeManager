"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchAllProvinces, Province } from "@/lib/locationService";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Address {
  id?: number;
  fullName: string;
  phone: string;
  company?: string;
  province: string;
  district: string;
  ward: string;
  addressLine: string;
  zipCode?: string;
  isDefault: boolean;
}

export default function AddressModal({
  address,
  onClose,
  onSaved,
}: {
  address: Address;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<Address>({
    fullName: "",
    phone: "",
    company: "",
    province: "",
    district: "",
    ward: "",
    addressLine: "",
    zipCode: "",
    isDefault: false,
  });

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [wards, setWards] = useState<string[]>([]);

 useEffect(() => {
  // 🟢 1. Tải danh sách tỉnh thành
  const loadProvinces = async () => {
    try {
      const data = await fetchAllProvinces();
      setProvinces(data);

      // 🟢 2. Nếu đang chỉnh sửa địa chỉ, set form và tự load quận/huyện + phường/xã
      if (address && address.id) {
        console.log("✏️ Editing existing address:", address);
        setForm({
          fullName: address.fullName || "",
          phone: address.phone || "",
          company: address.company || "",
          province: address.province || "",
          district: address.district || "",
          ward: address.ward || "",
          addressLine: address.addressLine || "",
          zipCode: address.zipCode || "",
          isDefault: address.isDefault || false,
        });

        // 🔹 Tìm tỉnh tương ứng trong danh sách
        const selectedProvince = data.find(
          (p) => p.province === address.province
        );

        if (selectedProvince) {
          // 🔹 Lấy danh sách quận/huyện
          const districtList = [
            ...new Set(selectedProvince.wards.map((w) => w.name.split(",")[0])),
          ];
          setDistricts(districtList);

          // 🔹 Lấy danh sách phường/xã thuộc quận đã chọn
          const wardList = selectedProvince.wards
            .filter((w) => w.name.includes(address.district))
            .map((w) => w.name);
          setWards(wardList);
        }
      } else {
        // 🆕 Nếu là thêm mới thì reset form
        setForm({
          fullName: "",
          phone: "",
          company: "",
          province: "",
          district: "",
          ward: "",
          addressLine: "",
          zipCode: "",
          isDefault: false,
        });
        setDistricts([]);
        setWards([]);
      }
    } catch (err) {
      console.error("❌ Failed to load provinces:", err);
    }
  };

  loadProvinces();
}, [address]);


  const handleProvince = (provinceName: string) => {
    setForm({ ...form, province: provinceName, district: "", ward: "" });
    const selected = provinces.find((p) => p.province === provinceName);
    if (selected) {
      const dists = selected.wards.map((w) => w.name.split(",")[0]);
      setDistricts([...new Set(dists)]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (!user.id) {
    console.warn("⚠️ No user found in localStorage");
    return;
  }

  const data = { ...form, customerId: user.id };
  console.log("📤 Sending address data:", data);

  try {
    if (address.id) {
      console.log("🟡 Updating address ID:", address.id);
      const res = await axios.put(`${API_URL}/addresses/${address.id}`, data);
      console.log("✅ Update response:", res.data);
    } else {
      console.log("🟢 Creating new address...");
      const res = await axios.post(`${API_URL}/addresses`, data);
      console.log("✅ Create response:", res.data);
    }

    onSaved();
    onClose();
  } catch (err: unknown) {
  if (err instanceof Error) {
    console.error("❌ Error submitting address:", err.message);
  } else {
    console.error("❌ Unknown error submitting address:", err);
  }
  alert("Thao tác thất bại. Vui lòng kiểm tra console để xem chi tiết.");
}

};

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h3 className="text-lg font-semibold mb-4">
          {address.id ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <input
            type="text"
            placeholder="Họ tên"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Số điện thoại"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Công ty"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Địa chỉ cụ thể"
            value={form.addressLine}
            onChange={(e) => setForm({ ...form, addressLine: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />

          <div className="flex gap-2">
            <select
              className="border px-3 py-2 rounded w-1/3"
              value={form.province}
              onChange={(e) => handleProvince(e.target.value)}
            >
              <option value="">Tỉnh thành</option>
              {provinces.map((p) => (
                <option key={p.id} value={p.province}>
                  {p.province}
                </option>
              ))}
            </select>

            <select
              className="border px-3 py-2 rounded w-1/3"
              value={form.district}
              onChange={(e) => setForm({ ...form, district: e.target.value })}
            >
              <option value="">Quận huyện</option>
              {districts.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>

            {/* <select
              className="border px-3 py-2 rounded w-1/3"
              value={form.ward}
              onChange={(e) => setForm({ ...form, ward: e.target.value })}
            >
              <option value="">Phường xã</option>
              {wards.map((w) => (
                <option key={w}>{w}</option>
              ))}
            </select> */}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={(e) =>
                setForm({ ...form, isDefault: e.target.checked })
              }
            />
            <label>Đặt là địa chỉ mặc định</label>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-[#a63d2e] text-white px-4 py-2 rounded hover:bg-[#8d2e22]"
            >
              {address.id ? "Lưu thay đổi" : "Thêm địa chỉ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
