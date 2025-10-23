import { FastifyInstance } from "fastify";
import { categoryController } from "../controllers/categories.controller";

export default async function categoriesRoutes(app: FastifyInstance) {
  app.get("/", categoryController.getAll);
  app.get("/:id", categoryController.getById);
  app.post("/", categoryController.create);
  app.put("/:id", categoryController.update);
  app.delete("/:id", categoryController.remove);
}
