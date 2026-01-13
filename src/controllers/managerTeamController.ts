import { Request, Response } from "express";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { AppError } from "@/utils/appError";

class ManagerTeamController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(1, { message: "name cannot be empty" }),
      description: z
        .string()
        .trim()
        .min(1, { message: "description cannot be empty" }),
    });

    const { name, description } = bodySchema.parse(req.body);

    const { updatedAt, ...rest } = await prisma.teams.create({
      data: { name, description },
    });

    return res.status(201).json({ team: rest });
  }

  async update(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(1, { message: "name cannot be empty" }),
      description: z
        .string()
        .trim()
        .min(1, { message: "description cannot be empty" }),
    });
    const paramsSchema = z.object({
      id: z.uuid(),
    });
    const { id } = paramsSchema.parse(req.params);

    const response = await prisma.teams.findFirst({ where: { id } });

    if (!response) {
      throw new AppError("team not found", 404);
    }

    const { name, description } = bodySchema.parse(req.body);

    await prisma.teams.update({ data: { name, description }, where: { id } });

    return res.json({ id, team: { name, description } });
  }

  async index(req: Request, res: Response) {
    const response = await prisma.teams.findMany({
      orderBy: { createdAt: "asc" },
    });
    return res.json(response);
  }

  async delete(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.uuid(),
    });
    const { id } = paramsSchema.parse(req.params);

    try {
      await prisma.teams.delete({ where: { id } });
    } catch {
      throw new AppError("Team not found", 404);
    }

    return res.json();
  }

  async addMember(req: Request, res: Response) {
    const bodySchema = z.object({
      userId: z.uuid(),
      teamId: z.uuid(),
    });
    const { userId, teamId } = bodySchema.parse(req.body);

    const team = await prisma.teams.findFirst({ where: { id: teamId } });
    const member = await prisma.user.findFirst({ where: { id: userId } });

    if (!team) {
      throw new AppError("team not found");
    }
    if (!member) {
      throw new AppError("member not found");
    }

    await prisma.teamsMembers.create({ data: { teamId, userId } });

    return res.json();
  }

  async deleteMember(req: Request, res: Response) {
    const bodySchema = z.object({
      userId: z.uuid({message: "uuid"}),
      teamId: z.uuid({message: "uuid"}),
    });
    const { userId, teamId } = bodySchema.parse(req.body);

    try {
      await prisma.teamsMembers.delete({
        where: {
          userId_teamId: {
            userId,
            teamId,
          },
        },
      });
    } catch {
      throw new AppError("it was not possible to delete");
    }

    return res.json();
  }
}

export { ManagerTeamController };
