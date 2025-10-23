"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Province, fetchAllProvinces } from "@/lib/locationService";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Props {
  onProvinceChange?: (province: string) => void;
}

export default function CheckoutInfo({ onProvinceChange }: Props) {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [wards, setWards] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    province: "",
    district: "",
    ward: "",
    note: "",
  });

  useEffect(() => {
    fetchAllProvinces()
      .then((data) => setProvinces(data))
      .catch((err) => console.error("❌ Lỗi tải danh sách tỉnh:", err));
  }, []);

  const handleProvince = (provinceName: string) => {
    setForm({ ...form, province: provinceName, district: "", ward: "" });
    onProvinceChange?.(provinceName);
    const selected = provinces.find((p) => p.province === provinceName);
    if (selected) {
      const dists = selected.wards.map((w) => w.name.split(",")[0]);
      setDistricts([...new Set(dists)]);
      setWards([]);
    }
  };

  const handleDistrict = (districtName: string) => {
    setForm({ ...form, district: districtName, ward: "" });
    const selectedProvince = provinces.find(
      (p) => p.province === form.province
    );
    if (selectedProvince) {
      const wardList = selectedProvince.wards
        .filter((w) => w.name.includes(districtName))
        .map((w) => w.name);
      setWards(wardList);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.fullName.trim()) newErrors.fullName = "Vui lòng nhập họ và tên";
    if (!form.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    if (!form.addressLine.trim())
      newErrors.addressLine = "Vui lòng nhập địa chỉ cụ thể";
    if (!form.province) newErrors.province = "Vui lòng chọn tỉnh/thành";
    if (!form.district) newErrors.district = "Vui lòng chọn quận/huyện";
    if (!form.ward) newErrors.ward = "Vui lòng chọn phường/xã";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🟢 Gọi validate trước khi cho phép tiếp tục (có thể truyền callback)
  const handleBlur = () => validateForm();

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-[#5C2C1C]">
        Thông tin nhận hàng
      </h2>

      {/* Họ và tên */}
      <div>
        <input
          type="text"
          placeholder="Họ và tên"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          onBlur={handleBlur}
          className={`w-full border rounded-md p-2 ${
            errors.fullName ? "border-red-500" : "border-gray-300"
          }`}
          required
        />
        {errors.fullName && (
          <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
        )}
      </div>

      {/* Số điện thoại */}
      <div>
        <input
          type="tel"
          placeholder="Số điện thoại"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          onBlur={handleBlur}
          className={`w-full border rounded-md p-2 ${
            errors.phone ? "border-red-500" : "border-gray-300"
          }`}
          required
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Địa chỉ cụ thể */}
      <div>
        <input
          type="text"
          placeholder="Địa chỉ cụ thể"
          value={form.addressLine}
          onChange={(e) => setForm({ ...form, addressLine: e.target.value })}
          onBlur={handleBlur}
          className={`w-full border rounded-md p-2 ${
            errors.addressLine ? "border-red-500" : "border-gray-300"
          }`}
          required
        />
        {errors.addressLine && (
          <p className="text-red-500 text-xs mt-1">{errors.addressLine}</p>
        )}
      </div>

      {/* --- Tỉnh/Thành --- */}
      <div>
        <select
          className={`w-full border rounded-md p-2 ${
            errors.province ? "border-red-500" : "border-gray-300"
          }`}
          value={form.province}
          onChange={(e) => handleProvince(e.target.value)}
          onBlur={handleBlur}
          required
        >
          <option value="">Tỉnh thành</option>
          {provinces.map((prov) => (
            <option key={prov.id} value={prov.province}>
              {prov.province}
            </option>
          ))}
        </select>
        {errors.province && (
          <p className="text-red-500 text-xs mt-1">{errors.province}</p>
        )}
      </div>

      {/* --- Quận/Huyện --- */}
      <div>
        <select
          className={`w-full border rounded-md p-2 ${
            errors.district ? "border-red-500" : "border-gray-300"
          }`}
          value={form.district}
          onChange={(e) => handleDistrict(e.target.value)}
          onBlur={handleBlur}
          required
        >
          <option value="">Quận/Huyện</option>
          {districts.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        {errors.district && (
          <p className="text-red-500 text-xs mt-1">{errors.district}</p>
        )}
      </div>

      
      {/* Ghi chú */}
      <textarea
        placeholder="Ghi chú (tùy chọn)"
        rows={3}
        value={form.note}
        onChange={(e) => setForm({ ...form, note: e.target.value })}
        className="w-full border rounded-md p-2 resize-none border-gray-300"
      />
    </div>
  );
}
