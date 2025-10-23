import { prisma } from "../plugins/prisma";

export const categoryService = {
  // Lấy tất cả categories (kèm danh sách products nếu cần)
  getAll: () =>
    prisma.category.findMany({
      include: { products: true }, // có thể bỏ nếu không cần
    }),

  // Lấy 1 category theo id
  getById: (id: number) =>
    prisma.category.findUnique({
      where: { id },
      include: { products: true },
    }),

  // Tạo mới category
  create: (data: any) => prisma.category.create({ data }),

  // Cập nhật category
  update: (id: number, data: any) =>
    prisma.category.update({ where: { id }, data }),

  // Xóa category
  remove: (id: number) => prisma.category.delete({ where: { id } }),
};
