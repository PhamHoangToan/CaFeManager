import { FaFacebookF, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { MdEmail, MdLocationOn, MdKeyboardArrowUp } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-[#f3f3f3] text-[#3c2a1e] mt-12 relative">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* ====== CỘT 1: THÔNG TIN CÔNG TY ====== */}
        <div>
          <img
            src="/logo2.png"
            alt="Coffee Logo"
            className="w-24 mb-3"
          />
          <p className="text-sm mb-3">
            Coffee Loyalty® thuộc Công ty TNHH Dịch vụ Cà phê Cao Nguyên. Tự hào là nhà cung cấp sản phẩm và dịch vụ cà phê chất lượng cao.
          </p>
          <p className="flex items-start gap-2 text-sm mb-2">
            <MdLocationOn className="text-lg text-[#a63d2e]" />
            <span>125-127 Nguyễn Cơ Thạch, Q.2, TP. Hồ Chí Minh</span>
          </p>
          <p className="flex items-center gap-2 text-sm mb-1">
            <FaPhoneAlt className="text-[#a63d2e]" /> 19001755
          </p>
          <p className="flex items-center gap-2 text-sm mb-3">
            <MdEmail className="text-[#a63d2e]" /> support@coffeeloyalty.vn
          </p>

          {/* Mạng xã hội */}
          <div className="flex gap-3 text-xl text-[#a63d2e]">
            <FaFacebookF className="cursor-pointer hover:text-[#5C2C1C]" />
            <SiZalo className="cursor-pointer hover:text-[#5C2C1C]" />
            <FaInstagram className="cursor-pointer hover:text-[#5C2C1C]" />
          </div>
        </div>

        {/* ====== CỘT 2: CHÍNH SÁCH ====== */}
        <div>
          <h3 className="font-semibold mb-3">Chính sách</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[#a63d2e]">Chính sách đặt hàng</a></li>
            <li><a href="#" className="hover:text-[#a63d2e]">Chính sách bảo mật</a></li>
            <li><a href="#" className="hover:text-[#a63d2e]">Chính sách thanh toán</a></li>
          </ul>
        </div>

        {/* ====== CỘT 3: HỖ TRỢ ====== */}
        <div>
          <h3 className="font-semibold mb-3">Hỗ trợ</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[#a63d2e]">Tìm kiếm</a></li>
            <li><a href="#" className="hover:text-[#a63d2e]">Đăng nhập</a></li>
            <li><a href="#" className="hover:text-[#a63d2e]">Đăng ký</a></li>
            <li><a href="#" className="hover:text-[#a63d2e]">Giỏ hàng</a></li>
            <li><a href="#" className="hover:text-[#a63d2e]">Liên hệ</a></li>
          </ul>
        </div>

        {/* ====== CỘT 4: ĐĂNG KÝ NHẬN TIN ====== */}
        <div>
          <h3 className="font-semibold mb-3">Đăng ký nhận tin</h3>
          <div className="flex rounded-full overflow-hidden bg-white border border-gray-300">
            <input
              type="email"
              placeholder="Nhập địa chỉ email"
              className="flex-1 px-4 py-2 text-sm focus:outline-none"
            />
            <button className="bg-[#d5c6b2] text-[#5C2C1C] px-4 text-sm font-semibold hover:bg-[#cbb8a0]">
              Đăng ký
            </button>
          </div>

          <img
            src="/bo-cong-thuong.png"
            alt="Đã thông báo Bộ Công Thương"
            className="mt-4 w-40"
          />
        </div>
      </div>

      {/* ====== DÒNG BẢN QUYỀN ====== */}
      <div className="text-center text-xs text-gray-600 border-t border-gray-200 py-3">
        © {new Date().getFullYear()} Coffee Loyalty. All rights reserved.
      </div>

      {/* ====== NÚT NỔI (ZALO / LÊN ĐẦU TRANG) ====== */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-[#a63d2e] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-[#5C2C1C]"
        >
          <MdKeyboardArrowUp className="text-2xl" />
        </button>

        <a
          href="tel:19001755"
          className="bg-[#d43d3d] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-[#a52a2a]"
        >
          <FaPhoneAlt />
        </a>
      </div>
    </footer>
  );
}
