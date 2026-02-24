import {Router} from "express";
import {cancel, getById, save, update} from "../services/jobServices.js";

const jobRouter = Router();

jobRouter.get("/:jobId", getById);
jobRouter.post("/", save);
jobRouter.put("/:jobId", update);
jobRouter.delete("/:jobId", cancel);

export default jobRouter;