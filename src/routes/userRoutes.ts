import { Router } from "express";
import {getUserById} from "../services/userServices.js";

const userRouter = Router();

userRouter.get("/:userId", getUserById);

export default userRouter;