import axios from "axios";

/**
 * Cấu hình GHN (Giao Hàng Nhanh)
 * ⚙️ Dùng sandbox (test environment) để không cần xác thực cửa hàng thật.
 */
const GHN_API = process.env.GHN_BASE_URL ;
const GHN_TOKEN = process.env.GHN_TOKEN ;
const GHN_SHOP_ID = process.env.GHN_SHOP_ID ;

interface GHNResponse<T> {
  code: number;
  message: string;
  data: T;
}

export const ghnService = {
  /**
   * 🚚 Tính phí vận chuyển tạm tính
   * @param districtId - ID quận/huyện người nhận
   * @param wardCode - Mã phường/xã người nhận
   * @param weight - Trọng lượng (gram)
   */
  async getShippingFee(districtId: number, wardCode: string, weight = 500) {
    try {
      const res = await axios.post<GHNResponse<{ total: number }>>(
        `${GHN_API}/shipping-order/fee`,
        {
          from_district_id: 1451, // 🏬 mã quận của shop test
          service_type_id: 2, // Tiêu chuẩn
          to_district_id: districtId,
          to_ward_code: wardCode,
          weight,
        },
        {
          headers: {
            Token: GHN_TOKEN,
            ShopId: GHN_SHOP_ID,
          },
        }
      );

      return res.data.data.total;
    } catch (err: any) {
      console.error("❌ [GHN] Lỗi tính phí:", err.response?.data || err.message);
      throw new Error("Không thể tính phí vận chuyển (GHN).");
    }
  },

  /**
   * 📦 Tạo đơn hàng GHN (dùng thử trên sandbox)
   */
  async createOrder(order: {
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    customerWardCode: string;
    customerDistrictId: number;
    items: { productName: string; quantity: number; price: number }[];
  }) {
    try {
      const res = await axios.post<GHNResponse<{ order_code: string; total_fee: number }>>(
        `${GHN_API}/shipping-order/create`,
        {
          to_name: order.customerName,
          to_phone: order.customerPhone,
          to_address: order.customerAddress,
          to_ward_code: order.customerWardCode,
          to_district_id: order.customerDistrictId,
          weight: 500,
          payment_type_id: 1, // 1: Người nhận trả phí ship
          required_note: "KHONGCHOXEMHANG",
          items: order.items.map((i) => ({
            name: i.productName,
            quantity: i.quantity,
            price: i.price,
            weight: 200,
          })),
        },
        {
          headers: {
            Token: GHN_TOKEN,
            ShopId: GHN_SHOP_ID,
          },
        }
      );

      return res.data.data; // chứa order_code, total_fee
    } catch (err: any) {
      console.error("❌ [GHN] Lỗi tạo đơn hàng:", err.response?.data || err.message);
      throw new Error("Không thể tạo đơn hàng GHN (Token hoặc ShopId có thể sai).");
    }
  },

  /**
   * 🔍 Tra cứu trạng thái đơn hàng GHN
   */
  async getOrderDetail(orderCode: string) {
    try {
      const res = await axios.post<GHNResponse<any>>(
        `${GHN_API}/shipping-order/detail`,
        { order_code: orderCode },
        { headers: { Token: GHN_TOKEN } }
      );
      return res.data.data;
    } catch (err: any) {
      console.error("❌ [GHN] Lỗi tra cứu đơn hàng:", err.response?.data || err.message);
      throw new Error("Không thể tra cứu đơn hàng GHN.");
    }
  },
};
