import { Request, Response } from "express";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

class ListMembersTeamController {
  async index(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(req.params);

    const response = await prisma.teamsMembers.findMany({
      where: { teamId: id },
      include: {
        teams: { select: { name: true } },
        user: { select: { name: true, id: true } },
      },
    });

    return res.json(response);
  }
}

export { ListMembersTeamController };
