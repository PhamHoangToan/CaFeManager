import { FastifyRequest, FastifyReply } from "fastify";
import { cartService } from "../services/cart.service";
import { Prisma } from "@prisma/client";
type CartWithItems = Prisma.OrderGetPayload<{
  include: { items: { include: { product: true } } };
}>;
export const cartController = {
  // 🧾 Lấy giỏ hàng
  async getCart(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { cartId, customerId } = req.query as {
        cartId?: string;
        customerId?: string;
      };

      console.log("🟢 [getCart] Nhận request:", req.query);

      if (!cartId && !customerId) {
        console.warn("⚠️ [getCart] Thiếu cartId hoặc customerId");
        return reply.code(400).send({ message: "Thiếu cartId hoặc customerId" });
      }

      let cart: CartWithItems | null = null;

      if (customerId) {
        console.log("👤 [getCart] Dùng customerId:", customerId);
        cart = await cartService.getCartByCustomer(Number(customerId));
      } else {
        console.log("🛍️ [getCart] Dùng cartId:", cartId);
        cart = await cartService.getCartById(cartId!);
      }

      if (!cart) {
        console.warn("⚠️ [getCart] Không tìm thấy giỏ hàng!");
      } else {
        console.log("✅ [getCart] Giỏ hàng có:", cart.items?.length || 0, "sản phẩm");
      }

      reply.send(cart);
    } catch (err) {
      console.error("❌ [getCart] Lỗi:", err);
      reply.code(500).send({ message: "Lỗi server khi lấy giỏ hàng" });
    }
  },

  // ➕ Thêm sản phẩm
 async addItem(req: FastifyRequest, reply: FastifyReply) {
  try {
    console.log("📥 [addItem] Body:", req.body);
    const { cartId, customerId, productId, quantity, price } = req.body as any;

    console.log(
      "👤 [addItem] Người thêm:",
      customerId
        ? `Khách đăng nhập (customerId=${customerId})`
        : `Khách vãng lai (cartId=${cartId})`
    );

    if (!productId || !price)
      return reply.code(400).send({ message: "Thiếu dữ liệu sản phẩm" });

    const cart = customerId
      ? await cartService.addItemByCustomer(
          Number(customerId),
          Number(productId),
          Number(quantity || 1),
          Number(price)
        )
      : await cartService.addItemByCartId(
          cartId,
          Number(productId),
          Number(quantity || 1),
          Number(price)
        );

    console.log("✅ [addItem] Giỏ hàng sau khi thêm:", cart);
    reply.send(cart);
  } catch (err) {
    console.error("❌ [addItem] Lỗi:", err);
    reply.code(500).send({ message: "Lỗi server khi thêm sản phẩm vào giỏ" });
  }
},


  // 🔄 Cập nhật số lượng
  async updateQty(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { itemId, quantity } = req.body as any;
      if (!itemId || quantity == null)
        return reply.code(400).send({ message: "Thiếu itemId hoặc quantity" });

      const updated = await cartService.updateQuantity(Number(itemId), Number(quantity));
      reply.send(updated);
    } catch (err) {
      console.error("❌ [updateQty] Lỗi:", err);
      reply.code(500).send({ message: "Lỗi server khi cập nhật số lượng" });
    }
  },

  // ❌ Xóa sản phẩm
  async remove(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { itemId } = req.params as { itemId: string };
      if (!itemId) return reply.code(400).send({ message: "Thiếu itemId" });

      const item = await cartService.removeItem(Number(itemId));
      reply.send({ message: "Đã xóa sản phẩm khỏi giỏ hàng", item });
    } catch (err) {
      console.error("❌ [remove] Lỗi:", err);
      reply.code(500).send({ message: "Lỗi server khi xóa sản phẩm" });
    }
  },
};
