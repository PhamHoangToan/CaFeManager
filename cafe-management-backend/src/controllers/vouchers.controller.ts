import { FastifyRequest, FastifyReply } from "fastify";
import { voucherService } from "../services/vouchers.service";

export const voucherController = {
  // 🔹 Lấy tất cả voucher
  getAll: async (_req: FastifyRequest, reply: FastifyReply) => {
    reply.send(await voucherService.getAll());
  },

  // 🔹 Tạo voucher mới (có thể kèm ảnh upload)
  create: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const parts = req.parts(); // Dùng cho multipart/form-data
      const data: any = {};
      let imageUrl = "";

      for await (const part of parts as any) {
        if (part.file) {
          // 📸 Lưu ảnh
          const fileName = `${Date.now()}-${part.filename}`;
          const fs = await import("fs");
          const path = await import("path");
          const uploadPath = path.join(process.cwd(), "uploads", fileName);

          await fs.promises.writeFile(uploadPath, await part.toBuffer());
          imageUrl = `/uploads/${fileName}`;
        } else {
          data[part.fieldname] = part.value;
        }
      }

      if (imageUrl) data.imageUrl = imageUrl;

      const created = await voucherService.create(data);
      reply.code(201).send(created);
    } catch (err: any) {
      reply.code(400).send({ error: err.message });
    }
  },

  // 🔹 Áp dụng voucher cho order
  applyToOrder: async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = req.params as any;
    const { code } = req.body as any;
    reply.send(await voucherService.applyToOrder(Number(id), code));
  },
};
