import { Router } from "express";
import {
    authenticateUser,
    createUser,
    deleteUser,
    getAllActive,
    getUserById,
    updateUser
} from "../services/userService.js";

const userRouter = Router();

userRouter.get("/:userId", getUserById);
userRouter.get("/", getAllActive);
userRouter.post("/register", createUser);
userRouter.post("/:userId", authenticateUser);
userRouter.put("/:userId", updateUser);
userRouter.delete("/:userId", deleteUser);

export default userRouter;