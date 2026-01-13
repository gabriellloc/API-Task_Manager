// Imports
import { Router } from "express";
// Import Routes
import { userRouter } from "./userRoutes";
import { sessionRouter } from "./sessionRoutes";
import { managerTeamsRouter } from "./managerTeamsRoutes";
import { listMembersTeamRouter } from "./listMembersTeamsRoutes";
import { tasksRouter } from "./tasksRoutes";

const router = Router();

// useRoutes
router.use("/users", userRouter);
router.use("/tasks", tasksRouter);
router.use("/session", sessionRouter);
router.use("/manager-teams", managerTeamsRouter);
router.use("/list-members-team", listMembersTeamRouter);

// Export
export { router };
