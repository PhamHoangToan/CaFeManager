import { FastifyRequest, FastifyReply } from "fastify";
import { productService } from "../services/products.service";
import fs from "fs";
import path from "path";

export const productController = {
  getAll: async (_req: FastifyRequest, reply: FastifyReply) => {
    const data = await productService.getAll();
    reply.send(data);
  },
   async getByCategory(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = req.params as { id: string };
      const data = await productService.getByCategory(Number(id));

      if (!data || data.length === 0) {
        return reply.code(404).send({ message: "No products found in this category" });
      }

      reply.send(data);
    } catch (err) {
      console.error("❌ Error fetching products by category:", err);
      reply.code(500).send({ message: "Error fetching products by category" });
    }
  },

  getById: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = req.params as { id: string };
      const product = await productService.getById(Number(id));
      if (!product) {
        return reply.code(404).send({ message: "Không tìm thấy sản phẩm" });
      }
      reply.send(product);
    } catch (error) {
      console.error("❌ Error in getById:", error);
      reply.code(500).send({ message: "Lỗi server" });
    }
  },

  create: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const parts = req.parts();
      let productData: any = {};
      let imageUrl = "";

      console.log("🚀 [CREATE PRODUCT] Bắt đầu xử lý form-data...");

      for await (const part of parts as any) {
        if (part.file) {
          const uploadDir = path.join(process.cwd(), "uploads");
          if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

          const filePath = path.join(uploadDir, part.filename);
          const writeStream = fs.createWriteStream(filePath);
          await part.file.pipe(writeStream);

          imageUrl = `http://localhost:4000/uploads/${part.filename}`;
        } else {
          productData[part.fieldname] = part.value;
        }
      }

      if (imageUrl) productData.imageUrl = imageUrl;
      if (productData.price) productData.price = parseFloat(productData.price);
      if (productData.categoryId)
        productData.categoryId = parseInt(productData.categoryId);
      if (!productData.description) productData.description = "";

      if (productData.sizes) {
        try {
          const parsed = JSON.parse(productData.sizes);
          productData.sizes = Array.isArray(parsed)
            ? parsed.map((s) => ({
                name: s.name,
                price: parseFloat(s.price),
              }))
            : [];
        } catch (err) {
          console.error("⚠️ Lỗi parse sizes JSON:", err);
          productData.sizes = [];
        }
      } else {
        productData.sizes = [];
      }

      console.log("🧾 Dữ liệu lưu:", productData);
      const result = await productService.create(productData);
      reply.code(201).send(result);
    } catch (err) {
      console.error("❌ Lỗi khi tạo sản phẩm:", err);
      reply.code(500).send({ message: "Lỗi server khi tạo sản phẩm" });
    }
  },

  // ✏️ Cập nhật sản phẩm
  update: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = req.params as { id: string };
      const parts = req.parts();
      let productData: any = {};
      let imageUrl = "";

      console.log("🚀 [UPDATE PRODUCT] Bắt đầu xử lý cập nhật sản phẩm...");

      for await (const part of parts as any) {
        if (part.file) {
          const uploadDir = path.join(process.cwd(), "uploads");
          if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

          const filePath = path.join(uploadDir, part.filename);
          const writeStream = fs.createWriteStream(filePath);
          await part.file.pipe(writeStream);

          imageUrl = `http://localhost:4000/uploads/${part.filename}`;
        } else {
          productData[part.fieldname] = part.value;
        }
      }

      if (imageUrl) productData.imageUrl = imageUrl;
      if (productData.price) productData.price = parseFloat(productData.price);
      if (productData.categoryId)
        productData.categoryId = parseInt(productData.categoryId);
      if (!productData.description) productData.description = "";

      if (productData.sizes) {
        try {
          const parsed = JSON.parse(productData.sizes);
          productData.sizes = Array.isArray(parsed)
            ? parsed.map((s) => ({
                name: s.name,
                price: parseFloat(s.price),
              }))
            : [];
        } catch (err) {
          console.error("⚠️ Lỗi parse sizes JSON:", err);
          productData.sizes = [];
        }
      }

      const updated = await productService.update(Number(id), productData);
      reply.send(updated);
    } catch (err) {
      console.error("❌ Lỗi khi cập nhật sản phẩm:", err);
      reply.code(500).send({ message: "Lỗi server khi cập nhật sản phẩm" });
    }
  },
};
