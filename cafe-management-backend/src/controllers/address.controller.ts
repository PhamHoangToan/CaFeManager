import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../plugins/prisma";

export const addressController = {
  async getByCustomer(req: FastifyRequest<{ Params: { customerId: string } }>, reply: FastifyReply) {
    try {
      const { customerId } = req.params;
      console.log("📥 [GET] Fetching addresses for customerId =", customerId);

      const addresses = await prisma.address.findMany({
        where: { customerId: Number(customerId) },
        orderBy: { isDefault: "desc" },
      });

      console.log("✅ Found addresses:", addresses.length);
      reply.send(addresses);
    } catch (err) {
      console.error("❌ Error fetching addresses:", err);
      reply.status(500).send({ message: "Error fetching addresses" });
    }
  },

  async create(req: FastifyRequest, reply: FastifyReply) {
    try {
      const data = req.body as any;
      console.log("📩 [POST] Create address with data:", data);

      const address = await prisma.address.create({ data });

      console.log("✅ Address created successfully:", address);
      reply.send(address);
    } catch (err) {
      console.error("❌ Error creating address:", err);
      reply.status(400).send({ message: "Error creating address" });
    }
  },

  async update(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = req.params;
      const data = req.body as any;
      console.log("✏️ [PUT] Update address ID =", id, "with data:", data);

      const address = await prisma.address.update({
        where: { id: Number(id) },
        data,
      });

      console.log("✅ Address updated successfully:", address);
      reply.send(address);
    } catch (err) {
      console.error("❌ Error updating address:", err);
      reply.status(400).send({ message: "Error updating address" });
    }
  },
};
