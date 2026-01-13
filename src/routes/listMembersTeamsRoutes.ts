import { Router } from "express";
import { ListMembersTeamController } from "@/controllers/listMembersTeamController";

const listMembersTeamRouter = Router();
const listMembersTeamController = new ListMembersTeamController();

listMembersTeamRouter.get("/:id", listMembersTeamController.index);

export { listMembersTeamRouter };
