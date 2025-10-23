import { FastifyInstance } from "fastify";
import authRoutes from "./auth.route";
import productsRoutes from "./products.route";
import ordersRoutes from "./orders.route";
import vouchersRoutes from "./vouchers.route";
import kioskRoutes from "./kiosk.route";
import customersRoutes from "./customers.route";
import categoriesRoutes from "./categories.routes";
import cartRoutes from "./cart.route";
import { addressRoutes } from "./address.routes";
export default async function routes(app: FastifyInstance) {
  app.register(authRoutes, { prefix: "/auth" });
  app.register(productsRoutes, { prefix: "/products" });
  app.register(ordersRoutes, { prefix: "/orders" });
  app.register(vouchersRoutes, { prefix: "/vouchers" });
  app.register(kioskRoutes, { prefix: "/kiosks" });
  app.register(customersRoutes, { prefix: "/customers" });
  app.register(categoriesRoutes, { prefix: "/categories" });
  app.register(cartRoutes, { prefix: "/cart" });
  app.register(addressRoutes, { prefix: "/addresses" });
}
