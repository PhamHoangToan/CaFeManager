import { FastifyInstance } from "fastify";
import { customerController } from "../controllers/customers.controller";

export default async function customersRoutes(app: FastifyInstance) {
  app.get("/", customerController.getAll);
  app.get("/:id", customerController.getById);
  app.post("/", customerController.create);
  app.post("/:id/add-points", customerController.addPoints);
  app.post("/:id/use-points", customerController.usePoints);
   app.put("/:id/change-password", customerController.changePassword); 
}
