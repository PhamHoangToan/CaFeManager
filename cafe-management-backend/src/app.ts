// app.ts
import { FastifyPluginAsync } from "fastify";
import prismaPlugin from "./plugins/prisma";
import fastifyMultipart from "@fastify/multipart";
import routes from "./routes";

// ✅ buildApp là plugin — KHÔNG phải instance
export const buildApp: FastifyPluginAsync = async (app) => {
  // 1️⃣ Đăng ký Prisma plugin
  await app.register(prismaPlugin);

  // 2️⃣ Đăng ký multipart (để upload file)
  await app.register(fastifyMultipart, {
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  });

  // 3️⃣ Đăng ký routes chính
  await app.register(routes);
};
