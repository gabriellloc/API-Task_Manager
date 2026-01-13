// Imports
import { Request, Response } from "express";
import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/appError";
import { compare } from "bcrypt";
import { prisma } from "@/lib/prisma";
import { sign } from "jsonwebtoken";
import { z } from "zod";

class SessionController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      email: z.email({ message: "provide a valid email address" }),
      password: z.string().min(1, { message: "enter a password" }),
    });

    const { email, password } = bodySchema.parse(req.body);

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new AppError("Incorrect email or password");
    }

    if (!(await compare(password, user.password))) {
      throw new AppError("Incorrect email or password");
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ role: user.role ?? "member" }, secret, {
      subject: user.id,
      expiresIn,
    });

    const { password: hashedPassword, ...userWithoutPassword } = user;

    return res.json({ token: token, user: userWithoutPassword });
  }
}

export { SessionController };
