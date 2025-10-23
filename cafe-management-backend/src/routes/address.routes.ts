import { FastifyInstance } from "fastify";
import { addressController } from "../controllers/address.controller";

export async function addressRoutes(app: FastifyInstance) {
  app.get("/customer/:customerId", addressController.getByCustomer);
  app.post("/", addressController.create);
  app.put("/:id", addressController.update);
}
