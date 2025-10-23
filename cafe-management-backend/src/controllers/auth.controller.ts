import { FastifyRequest, FastifyReply } from "fastify";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import axios from "axios";
import { prisma } from "../plugins/prisma";
import { authService } from "../services/auth.service";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET as string;

type LoginBody = { username: string; password: string };

export const authController = {
 async register(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { fullName, phone, email, password } = req.body as any;

      if (!fullName || !phone || !email) {
        return reply.status(400).send({ message: "Thiếu thông tin bắt buộc" });
      }

      const customer = await authService.create({
        fullName,
        phone,
        email,
        password,
      });

      // 🔐 Tạo JWT token
      const token = jwt.sign(
        { id: customer.id, email: customer.email },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      // Lưu token vào DB
      await prisma.customer.update({
        where: { id: customer.id },
        data: { token },
      });

      return reply.send({
        message: "Đăng ký thành công",
        token,
        user: customer,
      });
    } catch (err: any) {
      console.error("Register error:", err);
      reply.status(400).send({ message: err.message || "Đăng ký thất bại" });
    }
  },

  login: async (req: FastifyRequest<{ Body: { email: string; password: string } }>, reply: FastifyReply) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    reply.send(result);
  } catch (err: any) {
    reply.code(401).send({ error: err.message });
  }
},


 // ============================
  // 🔹 GOOGLE LOGIN
  // ============================
  googleLoginHandler: async (
    req: FastifyRequest<{ Body: { idToken: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { idToken } = req.body;

      const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload) {
        return reply.status(400).send({ error: "Không thể xác thực Google." });
      }

      const { email, name, picture } = payload;

      if (!email) {
        return reply.status(400).send({ error: "Email không tồn tại." });
      }

      // 🔍 Tìm hoặc tạo mới
      let user = await prisma.customer.findUnique({ where: { email } });

      if (!user) {
        user = await prisma.customer.create({
          data: {
            email,
            fullName: name || "Người dùng Google",
            token: null,
          },
        });
      }

      // 🔑 Tạo JWT
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });

      // ✅ Cập nhật token trong DB
      await prisma.customer.update({
        where: { id: user.id },
        data: { token },
      });

      return reply.send({ token, user });
    } catch (err) {
      console.error("Google login error:", err);
      return reply.status(400).send({ error: "Xác thực Google thất bại." });
    }
  },

  // ============================
  // 🔹 FACEBOOK LOGIN
  // ============================
  // facebookLoginHandler: async (
  //   req: FastifyRequest<{ Body: { accessToken: string } }>,
  //   reply: FastifyReply
  // ) => {
  //   try {
  //     const { accessToken } = req.body;

  //     const fbRes = await axios.get(
  //       `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`
  //     );

  //     const { id, fullName, email } = fbRes.data;

  //     let user = await prisma.customer.findFirst({
  //       where: { facebookId: id },
  //     });

  //     if (!user) {
  //       user = await prisma.customer.create({
  //         data: {
  //           facebookId: id,
  //           fullName: name || "Người dùng Facebook",
  //           email: email || null,
  //           token: null,
  //         },
  //       });
  //     }

  //     const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });

  //     // ✅ Cập nhật token
  //     await prisma.customer.update({
  //       where: { id: user.id },
  //       data: { token },
  //     });

  //     return reply.send({ token, user });
  //   } catch (err: any) {
  //     console.error("Facebook login error:", err.response?.data || err.message);
  //     return reply.status(400).send({ error: "Đăng nhập Facebook thất bại." });
  //   }
  // },

  // ============================
  // 🔹 GOOGLE LOGIN KH (mobile / web frontend)
  // ============================
  googleLoginKHHandler: async (
    req: FastifyRequest<{
      Body: { email: string; name: string; photoUrl?: string };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { email, name, photoUrl } = req.body;

      if (!email || !name) {
        return reply
          .status(400)
          .send({ error: "Email và tên là bắt buộc." });
      }

      let user = await prisma.customer.findUnique({ where: { email } });

      if (!user) {
        user = await prisma.customer.create({
          data: {
            email,
            fullName: name,
            token: null,
          },
        });
      }

      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });

      await prisma.customer.update({
        where: { id: user.id },
        data: { token },
      });

      console.log("✅ Google Login KH:", user.id);

      return reply.send({
        token,
        user: {
          id: user.id,
          name: user.fullName,
          email: user.email,
        },
      });
    } catch (err) {
      console.error("Google login KH error:", err);
      return reply
        .status(500)
        .send({ error: "Đăng nhập Google thất bại." });
    }
  },
};
