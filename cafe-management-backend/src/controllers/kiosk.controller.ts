import { FastifyRequest, FastifyReply } from "fastify";
import { kioskService } from "../services/kiosk.service";

export const kioskController = {
  getAll: async (_req: FastifyRequest, reply: FastifyReply) => {
    reply.send(await kioskService.getAll());
  },

  getById: async (req: FastifyRequest, reply: FastifyReply) => {
    const id = Number((req.params as any).id);
    reply.send(await kioskService.getById(id));
  },

  create: async (req: FastifyRequest, reply: FastifyReply) => {
    reply.code(201).send(await kioskService.create(req.body));
  },

  update: async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = req.params as any;
    reply.send(await kioskService.update(Number(id), req.body));
  },

  remove: async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = req.params as any;
    reply.send(await kioskService.remove(Number(id)));
  },
};
