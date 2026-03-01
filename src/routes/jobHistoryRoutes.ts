import {Router} from "express";
import {getById, getByUserId, saveAll, update} from "../requestHandlers/jobRequests.js";

const jobRouter = Router();

jobRouter.get("/:jobId", getById);
jobRouter.get("/user/:userId", getByUserId);
jobRouter.post("/", saveAll);
jobRouter.put("/:jobId", update);

export default jobRouter;