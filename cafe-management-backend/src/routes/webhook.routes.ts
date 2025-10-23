// src/routes/webhook.routes.ts
import { FastifyInstance } from "fastify";
import { orderService } from "../services/orders.service";

export default async function webhookRoutes(app: FastifyInstance) {
  app.post("/webhooks/ghn", async (req, reply) => {
    try {
      const data = req.body;
      console.log("📦 GHN Webhook nhận được:", data);

      await orderService.updateByTracking(data.OrderCode, {
        shippingStatus: data.Status,
      });

      reply.send({ success: true });
    } catch (err) {
      console.error("❌ Lỗi webhook GHN:", err);
      reply.code(500).send({ success: false });
    }
  });
}
