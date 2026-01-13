// Imports
import { Router } from "express";

// Import Controller
import { CreateUser } from "@/controllers/createUserController";

import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
const userRouter = Router();
const createUser = new CreateUser();

// useControllers/routes
userRouter.post("/", createUser.create);
userRouter.get(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["admin"]),
  createUser.index
);

export { userRouter };
