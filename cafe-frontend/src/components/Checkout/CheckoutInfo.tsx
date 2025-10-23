"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Province, fetchAllProvinces } from "@/lib/locationService";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Props {
  onProvinceChange?: (province: string) => void;
}

interface Address {
  id?: number;
  fullName: string;
  phone: string;
  addressLine: string;
  province: string;
  district: string;
  ward: string;
  note?: string;
  isDefault?: boolean;
}

export default function CheckoutInfo({ onProvinceChange }: Props) {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [wards, setWards] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [form, setForm] = useState<Address>({
    fullName: "",
    phone: "",
    addressLine: "",
    province: "",
    district: "",
    ward: "",
    note: "",
  });

  // 🟢 Lấy danh sách tỉnh
  useEffect(() => {
    console.log("🌏 [CheckoutInfo] Bắt đầu tải danh sách tỉnh...");
    fetchAllProvinces()
      .then((data) => {
        console.log("✅ [CheckoutInfo] Tải tỉnh thành thành công:", data.length, "tỉnh");
        setProvinces(data);
      })
      .catch((err) => console.error("❌ [CheckoutInfo] Lỗi tải danh sách tỉnh:", err));
  }, []);

  // 🟢 Nếu user đã đăng nhập → tự động load địa chỉ mặc định
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    console.log("👤 [CheckoutInfo] User localStorage:", user);

    if (!user?.id) {
      console.warn("⚠️ [CheckoutInfo] Không tìm thấy user.id trong localStorage");
      return;
    }

    const loadDefaultAddress = async () => {
      try {
        console.log("🚀 [CheckoutInfo] Gọi API lấy địa chỉ:", `${API_URL}/addresses/customer/${user.id}`);
        const res = await axios.get(`${API_URL}/addresses/customer/${user.id}`);
        console.log("📦 [CheckoutInfo] API Response:", res.data);

        // Kiểm tra xem API trả về data đúng dạng hay không
        if (!res.data) {
          console.warn("⚠️ [CheckoutInfo] API không trả về dữ liệu");
          return;
        }

        const addresses: Address[] = Array.isArray(res.data) ? res.data : res.data?.data || [];

        console.log("📬 [CheckoutInfo] Tổng địa chỉ tìm thấy:", addresses.length);

        if (addresses.length === 0) {
          console.warn("⚠️ [CheckoutInfo] Người dùng chưa có địa chỉ nào trong DB");
          return;
        }

        // Ưu tiên địa chỉ mặc định
        const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
        console.log("🏠 [CheckoutInfo] Default address:", defaultAddr);

        // Cập nhật form
        setForm({
          fullName: defaultAddr.fullName || "",
          phone: defaultAddr.phone || "",
          addressLine: defaultAddr.addressLine || "",
          province: defaultAddr.province || "",
          district: defaultAddr.district || "",
          ward: defaultAddr.ward || "",
          note: defaultAddr.note || "",
        });

        // 🔍 Tự động load danh sách quận/huyện và phường/xã
        const selectedProvince = provinces.find(
          (p) => p.province === defaultAddr.province
        );
        if (!selectedProvince) {
          console.warn("⚠️ [CheckoutInfo] Không tìm thấy tỉnh trong danh sách:", defaultAddr.province);
          return;
        }

        const dists = [
          ...new Set(selectedProvince.wards.map((w) => w.name.split(",")[0])),
        ];
        setDistricts(dists);

        const wardList = selectedProvince.wards
          .filter((w) => w.name.includes(defaultAddr.district))
          .map((w) => w.name);
        setWards(wardList);

        console.log("✅ [CheckoutInfo] Load địa chỉ thành công, form đã được điền");
      } catch (err: any) {
        console.error("❌ [CheckoutInfo] Lỗi khi load địa chỉ mặc định:", err.message || err);
      }
    };

    if (provinces.length > 0) {
      console.log("🌐 [CheckoutInfo] Provinces đã sẵn sàng, tiến hành load địa chỉ...");
      loadDefaultAddress();
    } else {
      console.log("⏳ [CheckoutInfo] Chưa có provinces, chờ useEffect kế tiếp...");
    }
  }, [provinces]); // Chờ danh sách tỉnh load xong trước khi fill

  const handleProvince = (provinceName: string) => {
    console.log("📍 [CheckoutInfo] Chọn tỉnh:", provinceName);
    setForm({ ...form, province: provinceName, district: "", ward: "" });
    onProvinceChange?.(provinceName);

    const selected = provinces.find((p) => p.province === provinceName);
    if (selected) {
      const dists = selected.wards.map((w) => w.name.split(",")[0]);
      setDistricts([...new Set(dists)]);
      setWards([]);
      console.log("🏙️ [CheckoutInfo] Cập nhật danh sách quận/huyện:", dists.length);
    }
  };

  const handleDistrict = (districtName: string) => {
    console.log("🏘️ [CheckoutInfo] Chọn quận:", districtName);
    setForm({ ...form, district: districtName, ward: "" });

    const selectedProvince = provinces.find(
      (p) => p.province === form.province
    );
    if (selectedProvince) {
      const wardList = selectedProvince.wards
        .filter((w) => w.name.includes(districtName))
        .map((w) => w.name);
      setWards(wardList);
      console.log("🏡 [CheckoutInfo] Cập nhật danh sách phường/xã:", wardList.length);
    }
  };

  // 🧾 Validation
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
    console.log("🧩 [CheckoutInfo] Kết quả validate:", newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = () => validateForm();

  // 🖥️ Render UI
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

      {/* Tỉnh/Thành */}
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

      {/* Quận/Huyện */}
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
