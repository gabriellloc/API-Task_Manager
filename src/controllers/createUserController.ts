// Imports
import { Request, Response } from "express";
import { hash, compare } from "bcrypt";
// Database
import { prisma } from "@/lib/prisma";
// ZOD
import { z } from "zod";
// AppError
import { AppError } from "@/utils/appError";

class CreateUser {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(1, { message: "name cannot be empty" }),
      email: z.email({ message: "provide a valid email address" }),
      password: z
        .string()
        .min(8, { message: "password must be 8 characters long" }),
    });

    const { name, email, password } = bodySchema.parse(req.body);

    const hashedPassword = await hash(password, 8);

    const hasEmail = await prisma.user.findFirst({ where: { email } });

    if (!!hasEmail) {
      throw new AppError("email has already been registered");
    }

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json();
  }

  async index(req: Request, res: Response) {
    const user = await prisma.user.findMany({ orderBy: { name: "asc" } });
    return res.json(user);
  }
}

export { CreateUser };
