import { prisma } from "../plugins/prisma";
import { hashPassword, comparePassword, generateToken } from "../utils/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "secret-key";
export const authService = {
  register: async (data: any) => {
    const existing = await prisma.user.findUnique({ where: { username: data.username } });
    if (existing) throw new Error("Username already exists");
    const hashed = await hashPassword(data.password);
    return prisma.user.create({
      data: {
        username: data.username,
        passwordHash: hashed,
        roleId: data.roleId || null,
        fullName: data.fullName || null,
      },
    });
  },
   async login(email: string, password: string) {
    const user = await prisma.customer.findUnique({ where: { email } });
    if (!user) throw new Error("Email không tồn tại");

    if (!user.passwordHash)
      throw new Error("Tài khoản này chưa có mật khẩu, vui lòng đăng ký lại");

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new Error("Mật khẩu không đúng");

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    await prisma.customer.update({
      where: { id: user.id },
      data: { token },
    });

    return { user, token };
  },
  async create(data: {
  fullName: string;
  phone: string;
  email: string;
  password: string;
}) {
  const { fullName, phone, email, password } = data;

  if (!email || !password) throw new Error("Thiếu email hoặc mật khẩu");

  const existing = await prisma.customer.findFirst({
    where: { OR: [{ email }, { phone }] },
  });
  if (existing) throw new Error("Email hoặc số điện thoại đã tồn tại");

  const passwordHash = await bcrypt.hash(password, 10);

  const newCustomer = await prisma.customer.create({
    data: {
      fullName,
      phone,
      email,
      passwordHash,
    },
  });

  return newCustomer;
},
  async findByEmail(email: string) {
    return prisma.customer.findUnique({ where: { email } });
  },
};
