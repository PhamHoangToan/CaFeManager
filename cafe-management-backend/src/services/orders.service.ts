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

  // 🎁 Tích điểm cho khách hàng
  if (order.customerId) {
    const pointRate = 0.05; // 5% tổng đơn hàng
    const earnedPoints = Math.floor(Number(order.totalAmount) * pointRate);

    await prisma.customer.update({
      where: { id: order.customerId },
      data: {
        points: { increment: earnedPoints },
        pointLogs: {
          create: {
            orderId: order.id,
            type: "earn", // ⚡ BẮT BUỘC CÓ TRƯỜNG NÀY
            pointsEarned: earnedPoints,
            pointsUsed: 0,
          },
        },
      },
    });

    console.log(
      `🎉 Cộng ${earnedPoints} điểm cho khách hàng ID=${order.customerId}`
    );
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


