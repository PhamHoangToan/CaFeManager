// src/routes/shipping.routes.ts
import { FastifyInstance } from "fastify";
import { ghnService } from "../services/ghn.service";

export default async function shippingRoutes(app: FastifyInstance) {
  app.post("/fee", async (req, reply) => {
    const { districtId, wardCode, weight } = req.body as any;
    try {
      const fee = await ghnService.getShippingFee(districtId, wardCode, weight);
      reply.send({ total: fee });
    } catch (err) {
      console.error("❌ GHN fee error:", err);
      reply.code(500).send({ message: "Lỗi tính phí GHN" });
    }
  });
}
