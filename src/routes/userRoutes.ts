import {Router} from "express";
import {getActiveUsers, getUser} from "../requestHandlers/userRequests.js";


const userRouter = Router();

userRouter.get("/:userId", getUser);
userRouter.get("/", getActiveUsers);
/* TODO
userRouter.post("/register", createUser);
userRouter.post("/:userId", authenticateUser);
userRouter.put("/:userId", updateUser);
userRouter.delete("/:userId", deleteUser);
 */

export default userRouter;