import { FastifyInstance } from "fastify";
import { voucherController } from "../controllers/vouchers.controller";

export default async function vouchersRoutes(app: FastifyInstance) {
  app.get("/", voucherController.getAll);
  app.post("/", voucherController.create);
  app.post("/apply/:id", voucherController.applyToOrder);
}
