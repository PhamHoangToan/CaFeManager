import { prisma } from "../plugins/prisma";

export const productService = {
  // 🧾 Lấy toàn bộ sản phẩm (kèm category & size)
  getAll: () =>
    prisma.product.findMany({
      include: {
        category: true,
        sizes: true, // ✅ thêm để trả danh sách size
      },
    }),
    async getByCategory(categoryId: number) {
    return prisma.product.findMany({
      where: { categoryId },
      include: { category: true },
      orderBy: { id: "asc" },
    });
  },

  // 🔍 Lấy chi tiết sản phẩm theo ID
  getById: (id: number) =>
    prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        sizes: true, // ✅ thêm để API trả về size cho frontend
      },
    }),

  // ➕ Tạo mới sản phẩm (kèm sizes)
  create: (data: any) =>
    prisma.product.create({
      data: {
        name: data.name,
        description: data.description || "",
        price: parseFloat(data.price),
        imageUrl: data.imageUrl || null,
        categoryId: data.categoryId ? Number(data.categoryId) : null,
        status: data.status || "available",

        // ✅ Tạo các size nếu có
        sizes: data.sizes && data.sizes.length > 0
          ? {
              create: data.sizes.map((s: any) => ({
                name: s.name,
                price: parseFloat(s.price),
              })),
            }
          : undefined,
      },
      include: {
        category: true,
        sizes: true,
      },
    }),

  // ✏️ Cập nhật sản phẩm
  update: async (id: number, data: any) => {
  // Xóa size cũ và thêm lại (nếu có)
  await prisma.productSize.deleteMany({
    where: { productId: id },
  });

  return prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      price: data.price ? parseFloat(data.price) : undefined,
      imageUrl: data.imageUrl,
      status: data.status,
      categoryId: data.categoryId ? Number(data.categoryId) : undefined,
      sizes:
        data.sizes && data.sizes.length > 0
          ? {
              create: data.sizes.map((s: any) => ({
                name: s.name,
                price: parseFloat(s.price),
              })),
            }
          : undefined,
    },
    include: {
      category: true,
      sizes: true,
    },
  });
},


  // ❌ Xóa sản phẩm
  remove: (id: number) =>
    prisma.product.delete({
      where: { id },
    }),
};
