import { prisma } from "../plugins/prisma";

export const voucherService = {
  getAll: () => prisma.voucher.findMany(),

  getByCode: (code: string) =>
    prisma.voucher.findUnique({ where: { code } }),

  // 🔹 Thêm field imageUrl
  create: (data: any) =>
    prisma.voucher.create({
      data: {
        code: data.code,
        description: data.description,
        discountType: data.discountType || "percent",
        discountValue: parseFloat(data.discountValue || "0"),
        minOrderValue: data.minOrderValue
          ? parseFloat(data.minOrderValue)
          : null,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        usageLimit: data.usageLimit ? Number(data.usageLimit) : 1,
        status: data.status || "active",
        imageUrl: data.imageUrl || null, // 🖼️ Thêm hình ảnh
      },
    }),

  applyToOrder: async (orderId: number, code: string) => {
    const voucher = await prisma.voucher.findUnique({ where: { code } });
    if (!voucher) throw new Error("Voucher not found");
    if (voucher.usedCount! >= (voucher.usageLimit || 1))
      throw new Error("Voucher usage limit reached");

    const discountAmount =
      voucher.discountType === "percent"
        ? Number(voucher.discountValue) / 100
        : Number(voucher.discountValue);

    await prisma.voucher.update({
      where: { id: voucher.id },
      data: { usedCount: { increment: 1 } },
    });

    return prisma.orderVoucher.create({
      data: { orderId, voucherId: voucher.id, discountAmount },
    });
  },
};
