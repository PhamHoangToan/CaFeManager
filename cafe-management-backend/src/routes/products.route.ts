import { FastifyInstance } from "fastify";
import { productController } from "../controllers/products.controller";

export default async function productsRoutes(app: FastifyInstance) {
  app.get("/category/:id", productController.getByCategory);
  app.get("/", productController.getAll);
  app.post("/", productController.create);
  
  app.get("/:id", productController.getById);
  app.put("/:id", productController.update);
  
}
