import {Router} from "express";
import {
    cancel,
    getById,
    save,
    update,
    getByUserId,
    saveAll,
} from "../services/jobService.js";

const jobRouter = Router();

jobRouter.get("/:jobId", getById);
jobRouter.get("/user/:userId", getByUserId);
jobRouter.post("/", saveAll);
jobRouter.put("/:jobId", update);
jobRouter.delete("/:jobId", cancel);

export default jobRouter;