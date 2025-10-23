import { FastifyInstance } from "fastify";
import { kioskController } from "../controllers/kiosk.controller";

export default async function kioskRoutes(app: FastifyInstance) {
  app.get("/", kioskController.getAll);
  app.get("/:id", kioskController.getById);
  app.post("/", kioskController.create);
  app.put("/:id", kioskController.update);
  app.delete("/:id", kioskController.remove);
}
