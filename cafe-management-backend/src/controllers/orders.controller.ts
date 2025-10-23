import { FastifyRequest, FastifyReply } from "fastify";
import { orderService } from "../services/orders.service";
import { prisma } from "../plugins/prisma";

export const orderController = {
  // 🧾 Lấy tất cả đơn hàng
  getAll: async (_req: FastifyRequest, reply: FastifyReply) => {
    reply.send(await orderService.getAll());
  },

  // 🔍 Lấy đơn hàng theo ID
  getById: async (req: FastifyRequest, reply: FastifyReply) => {
    const id = Number((req.params as any).id);
    reply.send(await orderService.getById(id));
  },

  // 🛒 Tạo đơn hàng (không GHN)
  create: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const body: any = req.body;

      // ✅ Chỉ tạo đơn hàng trong DB
      const order = await orderService.create({
        ...body,
        shippingStatus: "CREATED", // optional
      });

      reply.code(201).send(order);
    } catch (err) {
      console.error("❌ Lỗi tạo đơn hàng:", err);
      reply.code(500).send({ message: "Không thể tạo đơn hàng." });
    }
  },

  // 🟢 Cập nhật trạng thái đơn nội bộ
  updateStatus: async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = req.params as any;
    const { status } = req.body as any;
    reply.send(await orderService.updateStatus(Number(id), status));
  },

  // 💳 Thêm thanh toán
  addPayment: async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = req.params as any;
    reply.code(201).send(await orderService.addPayment(Number(id), req.body));
  },

  // 👤 Lấy danh sách đơn hàng theo khách hàng
  async getOrdersByCustomer(
    req: FastifyRequest<{ Params: { customerId: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { customerId } = req.params;

      const orders = await prisma.order.findMany({
        where: { customerId: Number(customerId) },
        orderBy: { orderTime: "desc" },
        select: {
          id: true,
          orderTime: true,
          totalAmount: true,
          status: true,
          note: true,
          payments: {
            select: { status: true, method: true },
          },
        },
      });

      reply.send(orders);
    } catch (err) {
      console.error("Error fetching orders:", err);
      reply.status(500).send({ message: "Internal server error" });
    }
  },
};
