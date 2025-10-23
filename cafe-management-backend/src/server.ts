import Fastify from "fastify";
import cors from "@fastify/cors";
import { buildApp } from "./app";
import fastifyStatic from "@fastify/static";
import path from "path";
import fs from "fs";

async function startServer() {
  const app = Fastify({ logger: true });

  await app.register(cors, {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  });

  app.register(buildApp);

  const uploadDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

  app.register(fastifyStatic, { root: uploadDir, prefix: "/uploads/" });

  await app.listen({ port: 4000, host: "0.0.0.0" });
  console.log("🚀 Server running at http://localhost:4000");
}

startServer();
