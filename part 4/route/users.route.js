import { Router } from "express";
import { getAllUsers } from "../controllers/users.controller.js";
import { getUser, registerUser } from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get("/:id", getUser);
usersRouter.post("/", registerUser);
usersRouter.get("/", getAllUsers);

export default usersRouter;
