import bcrypt from "bcrypt";
import prisma from "../utils/client";

export const registerAdmin = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = "Admin";
  if (!email || !password) return;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existing = await prisma.admin.findUnique({
    where: { email },
  });

  if (!existing) {
    await prisma.admin.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });
  }
  console.log("Initial admin online");
};
