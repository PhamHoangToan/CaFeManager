
import { FastifyRequest, FastifyReply } from "fastify";
import { categoryService } from "../services/categories.service";
import fs from "fs";
import path from "path";

export const categoryController = {
  // GET /categories
  getAll: async (_req: FastifyRequest, reply: FastifyReply) => {
    const data = await categoryService.getAll();
    reply.send(data);
  },

  // GET /categories/:id
  getById: async (req: FastifyRequest, reply: FastifyReply) => {
    const id = Number((req.params as any).id);
    const data = await categoryService.getById(id);
    if (!data) return reply.code(404).send({ message: "Category not found" });
    reply.send(data);
  },

  // POST /categories (multipart/form-data)
  create: async (req: FastifyRequest, reply: FastifyReply) => {
    const parts = req.parts(); // ✅ dùng multipart

    let formData: any = {};
    let iconPath = "";

    for await (const part of parts as any) {
      if (part.file) {
        // nếu là file icon
        const uploadDir = path.join(process.cwd(), "uploads/icons");
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

        const fileName = `${Date.now()}-${part.filename}`;
        const filePath = path.join(uploadDir, fileName);

        await fs.promises.writeFile(filePath, await part.toBuffer());
        iconPath = `/uploads/icons/${fileName}`;
      } else {
        // nếu là trường text (name, description, ...)
        formData[part.fieldname] = part.value;
      }
    }

    if (iconPath) formData.icon = iconPath;

    const data = await categoryService.create(formData);
    reply.code(201).send(data);
  },

  // PUT /categories/:id
  update: async (req: FastifyRequest, reply: FastifyReply) => {
    const id = Number((req.params as any).id);
    const parts = req.parts();

    let updateData: any = {};
    let iconPath = "";

    for await (const part of parts as any) {
      if (part.file) {
        const uploadDir = path.join(process.cwd(), "uploads/icons");
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

        const fileName = `${Date.now()}-${part.filename}`;
        const filePath = path.join(uploadDir, fileName);

        await fs.promises.writeFile(filePath, await part.toBuffer());
        iconPath = `/uploads/icons/${fileName}`;
      } else {
        updateData[part.fieldname] = part.value;
      }
    }

    if (iconPath) updateData.icon = iconPath;

    const data = await categoryService.update(id, updateData);
    reply.send(data);
  },

  // DELETE /categories/:id
  remove: async (req: FastifyRequest, reply: FastifyReply) => {
    const id = Number((req.params as any).id);
    await categoryService.remove(id);
    reply.code(204).send();
  },
};
