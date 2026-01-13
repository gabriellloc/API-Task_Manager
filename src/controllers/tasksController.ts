import { Request, Response } from "express";
import { TaskPriority } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { includes, uuid, z } from "zod";
import { AppError } from "@/utils/appError";

class TasksController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      title: z.string().trim().min(1, { message: "title cannot be empty" }),
      description: z
        .string()
        .trim()
        .min(1, { message: "description cannot be empty" }),
      priority: z.enum(TaskPriority),
      assignedTo: z.uuid(),
      teamId: z.uuid(),
    });

    const { title, description, priority, assignedTo, teamId } =
      bodySchema.parse(req.body);

    const hasTeamMember = await prisma.teamsMembers.findUnique({
      where: { userId_teamId: { userId: assignedTo, teamId } },
    });

    if (!hasTeamMember) {
      throw new AppError("Not found", 404);
    }

    const response = await prisma.tasks.create({
      data: {
        title,
        description,
        priority,
        assignedTo,
        teamId,
      },
      include: {
        user: { select: { id: true, name: true } },
        teams: { select: { name: true } },
      },
    });

    return res.status(201).json(response);
  }

  async index(req: Request, res: Response) {
    if (req.user?.role === "admin") {
      const allTasks = await prisma.tasks.findMany({
        include: { user: { select: { name: true, id: true } } },
      });

      return res.json(allTasks);
    }

    const tasks = await prisma.tasks.findMany({
      where: { assignedTo: req.user?.id },
    });
    return res.json(tasks);
  }

  async update(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.uuid(),
    });

    const { id } = paramsSchema.parse(req.params);

    const task = await prisma.tasks.findFirst({
      where: { id },
    });

    if (req.user?.role != "admin" && req.user?.id !== task?.assignedTo) {
      throw new AppError("This task could not be loaded.", 401);
    }

    switch (task?.status) {
      case "pending":
        await prisma.tasks.update({
          where: { id },
          data: { status: "in_progress" },
        });
        break;
      case "in_progress":
        // Passar para delete
        await prisma.tasks.update({
          where: { id },
          data: { status: "completed" },
        });
        break;
      default:
        throw new AppError("task is completed");
    }
    const updatedTask = await prisma.tasks.findFirst({
      where: { id },
    });

    return res.json({ status: updatedTask?.status, task: updatedTask });
  }

  async delete(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: uuid(),
    });

    const { id } = paramsSchema.parse(req.params);

    const task = await prisma.tasks.findFirst({ where: { id } });

    if (req.user?.role != "admin" && req.user?.id !== task?.assignedTo) {
      throw new AppError("This task could not be loaded.", 401);
    }

    await prisma.tasks.delete({ where: { id } });
    return res.json();
  }
}

export { TasksController };
