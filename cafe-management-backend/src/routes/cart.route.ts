import { FastifyInstance } from "fastify";
import { cartController } from "../controllers/cart.controller";

export default async function cartRoutes(app: FastifyInstance) {
  app.get("/", cartController.getCart);          // Lấy giỏ hàng (cartId hoặc customerId)
  app.post("/add", cartController.addItem);      // Thêm sản phẩm
  app.put("/update", cartController.updateQty);  // Cập nhật số lượng
  app.delete("/:itemId", cartController.remove); // Xóa sản phẩm
}
