import { prisma } from "../plugins/prisma";

export const orderService = {
  getAll: () => prisma.order.findMany({
    include: {
      customer: true,
      table: true,
      kiosk: true,
      items: { include: { product: true } },
      payments: true,
      vouchers: { include: { voucher: true } },
    },
  }),

  getById: (id: number) => prisma.order.findUnique({
    where: { id },
    include: {
      items: { include: { product: true } },
      payments: true,
      vouchers: { include: { voucher: true } },
    },
  }),

 create: async (data: any) => {
  // 🧾 1️⃣ Tạo đơn hàng
  const order = await prisma.order.create({
    data: {
      tableId: data.tableId,
      kioskId: data.kioskId,
      customerId: data.customerId,
      userId: data.userId,
      note: data.note,
      totalAmount: data.totalAmount,
      items: {
        create: data.items.map((i: any) => ({
          productId: i.productId,
          quantity: i.quantity,
          price: i.price,
        })),
      },
    },
    include: { items: true },
  });

  // 🧹 2️⃣ Dọn giỏ hàng cũ của user (nếu có)
  // 🧹 2️⃣ Dọn giỏ hàng cũ của user (nếu có)
if (data.customerId) {
  const customerId = Number(data.customerId);
  try {
    console.log(`🧹 [OrderService] Dọn giỏ hàng (status='cart') cho customerId=${customerId}`);

    await prisma.order.deleteMany({
      where: {
        customerId,
        status: "cart"
      },
    });

    console.log(`✅ [OrderService] Đã xoá toàn bộ giỏ hàng (status='cart') customerId=${customerId}`);
  } catch (err) {
    console.error("⚠️ [OrderService] Lỗi khi xoá giỏ hàng:", err);
  }
}

  // 🎁 3️⃣ Cộng điểm thưởng cho khách hàng
  if (order.customerId) {
    const pointRate = 0.05;
    const earnedPoints = Math.floor(Number(order.totalAmount) * pointRate);

    await prisma.customer.update({
      where: { id: order.customerId },
      data: {
        points: { increment: earnedPoints },
        pointLogs: {
          create: {
            orderId: order.id,
            type: "earn",
            pointsEarned: earnedPoints,
            pointsUsed: 0,
          },
        },
      },
    });

    console.log(`🎉 Cộng ${earnedPoints} điểm cho khách hàng ID=${order.customerId}`);
  }

  return order;
},

async update(id: number, data: any) {
    return prisma.order.update({
      where: { id },
      data
    });
  },

  updateStatus: (id: number, status: string) =>
    prisma.order.update({ where: { id }, data: { status } }),

  addPayment: (orderId: number, data: any) =>
    prisma.payment.create({
      data: { orderId, method: data.method, amount: data.amount },
    }),

 async updateByTracking(orderCode: string, data: any) {
    return prisma.order.updateMany({
      where: { trackingCode: orderCode },
      data
    });
  }
};


