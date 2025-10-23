import { prisma } from "../plugins/prisma";
import { Prisma } from "@prisma/client";
type CartWithItems = Prisma.OrderGetPayload<{
  include: { items: { include: { product: true } } };
}>;
export const cartService = {
  // 🔍 Lấy giỏ theo customerId (người đã đăng nhập)
  async getCartByCustomer(customerId: number): Promise<CartWithItems> {
    console.log("🔍 [getCartByCustomer] customerId:", customerId);

    let cart = await prisma.order.findFirst({
      where: { customerId, status: "cart" },
      include: { items: { include: { product: true } } },
    });

    if (!cart) {
      console.log("🆕 [getCartByCustomer] Tạo giỏ hàng mới cho customerId:", customerId);
      cart = await prisma.order.create({
        data: { customerId, status: "cart", totalAmount: 0 },
        include: { items: { include: { product: true } } },
      });
    } else {
      console.log("📦 [getCartByCustomer] Đã có giỏ:", cart.items.length, "sản phẩm");
    }

    return cart;
  },

  async getCartById(cartId: string): Promise<CartWithItems> {
    console.log("🔍 [getCartById] cartId:", cartId);

    let cart = await prisma.order.findUnique({
      where: { cartKey: cartId },
      include: { items: { include: { product: true } } },
    });

    if (!cart) {
      console.log("🆕 [getCartById] Chưa có giỏ, tạo mới cho cartId:", cartId);
      cart = await prisma.order.create({
        data: { cartKey: cartId, status: "cart", totalAmount: 0 },
        include: { items: { include: { product: true } } },
      });
    } else {
      console.log("📦 [getCartById] Giỏ hiện có:", cart.items.length, "sản phẩm");
    }

    return cart;
  },
  // ➕ Thêm sản phẩm (đăng nhập)
  async addItemByCustomer(customerId: number, productId: number, quantity: number, price: number) {
    const cart = await cartService.getCartByCustomer(customerId);
    return cartService._addOrUpdate(cart.id, productId, quantity, price);
  },

  // ➕ Thêm sản phẩm (khách)
  async addItemByCartId(cartId: string, productId: number, quantity: number, price: number) {
    const cart = await cartService.getCartById(cartId);
    return cartService._addOrUpdate(cart.id, productId, quantity, price);
  },

  // ✅ Thực hiện thêm hoặc cập nhật
  async _addOrUpdate(orderId: number, productId: number, quantity: number, price: number) {
    const existing = await prisma.orderItem.findFirst({ where: { orderId, productId } });
    if (existing) {
      await prisma.orderItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
      });
    } else {
      await prisma.orderItem.create({ data: { orderId, productId, quantity, price } });
    }
    await cartService.recalculateTotal(orderId);
    return prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { product: true } } },
    });
  },

  // 🔁 Cập nhật số lượng
  async updateQuantity(itemId: number, quantity: number) {
    const item = await prisma.orderItem.update({ where: { id: itemId }, data: { quantity } });
    await cartService.recalculateTotal(item.orderId);
    return item;
  },

  // ❌ Xóa sản phẩm
  async removeItem(itemId: number) {
    const item = await prisma.orderItem.delete({ where: { id: itemId } });
    await cartService.recalculateTotal(item.orderId);
    return item;
  },

  // 🧮 Cập nhật tổng
  async recalculateTotal(orderId: number) {
    const items = await prisma.orderItem.findMany({ where: { orderId } });
    const total = items.reduce((sum, i) => sum + Number(i.price) * i.quantity, 0);
    await prisma.order.update({ where: { id: orderId }, data: { totalAmount: total } });
    return total;
  },
};
