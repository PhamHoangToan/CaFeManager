import { prisma } from "../plugins/prisma";

export const customerService = {
  // 🧩 Lấy danh sách khách hàng (kèm lịch sử điểm)
  getAll: () => prisma.customer.findMany({ include: { pointLogs: true } }),

  // 🧩 Lấy chi tiết 1 khách hàng
  getById: (id: number) =>
    prisma.customer.findUnique({
      where: { id },
      include: { pointLogs: true, orders: true },
    }),

  // 🧩 Tạo khách hàng mới
  create: (data: any) => prisma.customer.create({ data }),

  // 🎁 Cộng điểm (ví dụ sau khi đặt hàng thành công)
  addPoints: async (customerId: number, points: number, orderId?: number) => {
    // ✅ Cộng vào tổng điểm khách hàng
    await prisma.customer.update({
      where: { id: customerId },
      data: { points: { increment: points } },
    });

    // ✅ Ghi log lịch sử điểm
    return prisma.customerPointsHistory.create({
      data: {
        customerId,
        orderId,
        type: "earn", // ⚡ BẮT BUỘC - loại tích điểm
        pointsEarned: points,
        pointsUsed: 0,
      },
    });
  },

  // 💸 Trừ điểm (ví dụ khi thanh toán bằng điểm)
  usePoints: async (customerId: number, points: number, orderId?: number) => {
    // ✅ Trừ điểm tổng
    await prisma.customer.update({
      where: { id: customerId },
      data: { points: { decrement: points } },
    });

    // ✅ Ghi log lịch sử điểm
    return prisma.customerPointsHistory.create({
      data: {
        customerId,
        orderId,
        type: "redeem", // ⚡ BẮT BUỘC - loại sử dụng điểm
        pointsEarned: 0,
        pointsUsed: points,
      },
    });
  },
};
