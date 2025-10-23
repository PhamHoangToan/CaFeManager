import { FastifyInstance } from "fastify";
import { authController } from "../controllers/auth.controller";

export default async function authRoutes(app: FastifyInstance) {
  app.post("/register", authController.register);
  app.post("/login", authController.login);
  app.post("/google", authController.googleLoginHandler);
  // app.post("/auth/facebook", authController.facebookLoginHandler);
  app.post("/google-kh", authController.googleLoginKHHandler);
   //app.post("/register-kh", authController.register);
}
