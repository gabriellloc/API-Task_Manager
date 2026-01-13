import { Router } from "express";
import { TasksController } from "@/controllers/tasksController";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";

const tasksRouter = Router();
const tasksController = new TasksController();

tasksRouter.use(ensureAuthenticated);

tasksRouter.get("/", tasksController.index);
tasksRouter.post("/", tasksController.create);
tasksRouter.patch("/:id", tasksController.update);
tasksRouter.delete("/:id", tasksController.delete);

export { tasksRouter };
