import { prisma } from "../plugins/prisma";

export const kioskService = {
  getAll: () => prisma.kiosk.findMany({ include: { orders: true } }),
  getById: (id: number) =>
    prisma.kiosk.findUnique({
      where: { id },
      include: { orders: true },
    }),
  create: (data: any) => prisma.kiosk.create({ data }),
  update: (id: number, data: any) =>
    prisma.kiosk.update({ where: { id }, data }),
  remove: (id: number) => prisma.kiosk.delete({ where: { id } }),
};
