import { Router } from "express";

import { ManagerTeamController } from "@/controllers/managerTeamController";
// Auth
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const managerTeamsRouter = Router();
const managerTeamController = new ManagerTeamController();

managerTeamsRouter.use(ensureAuthenticated, verifyUserAuthorization(["admin"]));

// Teams
managerTeamsRouter.get("/team", managerTeamController.index);
managerTeamsRouter.post("/team", managerTeamController.create);
managerTeamsRouter.put("/team/:id", managerTeamController.update);
managerTeamsRouter.delete("/team/:id", managerTeamController.delete);

// ADDMembersToTheTeams
managerTeamsRouter.post("/member", managerTeamController.addMember)
managerTeamsRouter.delete("/member", managerTeamController.deleteMember)

export { managerTeamsRouter };
