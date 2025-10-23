import { FastifyRequest, FastifyReply } from "fastify";
import { customerService } from "../services/customers.service";
import { prisma } from "../plugins/prisma";
import bcrypt from "bcrypt";
export const customerController = {
  getAll: async (_req: FastifyRequest, reply: FastifyReply) => {
    reply.send(await customerService.getAll());
  },

  getById1: async (req: FastifyRequest, reply: FastifyReply) => {
    const id = Number((req.params as any).id);
    reply.send(await customerService.getById(id));
  },
   async getById(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = req.params;

      const customer = await prisma.customer.findUnique({
        where: { id: Number(id) },
        select: {
          id: true,
          fullName: true,
          email: true,
          phone: true,
          points: true,
          createdAt: true,
        },
      });

      if (!customer) return reply.status(404).send({ message: "Customer not found" });

      reply.send(customer);
    } catch (err) {
      console.error(err);
      reply.status(500).send({ message: "Internal server error" });
    }
  },

   async changePassword(req: FastifyRequest<{ Params: { id: string }; Body: { oldPassword: string; newPassword: string } }>, reply: FastifyReply) {
    try {
      const { id } = req.params;
      const { oldPassword, newPassword } = req.body;

      if (!oldPassword || !newPassword) {
        return reply.status(400).send({ message: "Thiếu mật khẩu cũ hoặc mới" });
      }

      // 🔎 Tìm customer
      const customer = await prisma.customer.findUnique({ where: { id: Number(id) } });
      if (!customer || !customer.passwordHash) {
        return reply.status(404).send({ message: "Không tìm thấy tài khoản hoặc chưa có mật khẩu" });
      }

      // 🔐 So sánh mật khẩu cũ
      const isValid = await bcrypt.compare(oldPassword, customer.passwordHash);
      if (!isValid) {
        return reply.status(401).send({ message: "Mật khẩu cũ không chính xác" });
      }

      // ⚙️ Hash mật khẩu mới
      const newHash = await bcrypt.hash(newPassword, 10);

      // 💾 Cập nhật
      await prisma.customer.update({
        where: { id: Number(id) },
        data: { passwordHash: newHash },
      });

      reply.send({ message: "Đổi mật khẩu thành công" });
    } catch (err) {
      console.error("Change password error:", err);
      reply.status(500).send({ message: "Lỗi server" });
    }
  },

  create: async (req: FastifyRequest, reply: FastifyReply) => {
    reply.code(201).send(await customerService.create(req.body));
  },

  addPoints: async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = req.params as any;
    const { points, orderId } = req.body as any;
    reply.send(await customerService.addPoints(Number(id), points, orderId));
  },

  usePoints: async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = req.params as any;
    const { points, orderId } = req.body as any;
    reply.send(await customerService.usePoints(Number(id), points, orderId));
  },
};
