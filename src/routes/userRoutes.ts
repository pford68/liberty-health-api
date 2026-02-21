import { Router } from "express";
import userService from "../services/userService.js";

const userRouter = Router();

userRouter.get("/:userId", userService.getUserById.bind(userService));
userRouter.post("/", userService.create.bind(userService))

export default userRouter;