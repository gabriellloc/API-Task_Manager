// Imports
import { Router } from "express";
// Imports controllers
import { SessionController } from "@/controllers/sessionController";

const sessionRouter = Router();
const sessionController = new SessionController();

// Routes
sessionRouter.get("/", sessionController.create)

export { sessionRouter };
