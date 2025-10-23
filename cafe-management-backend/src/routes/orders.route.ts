import { FastifyInstance } from "fastify";
import { orderController } from "../controllers/orders.controller";

export default async function ordersRoutes(app: FastifyInstance) {
  app.get("/", orderController.getAll);
  app.get("/:id", orderController.getById);
  app.post("/", orderController.create);
  app.patch("/:id/status", orderController.updateStatus);
  app.post("/:id/payments", orderController.addPayment);
   app.get("/customer/:customerId", orderController.getOrdersByCustomer);
}
