import {Router} from "express";
import {cancel, getById, getAll, saveAll, update} from "../services/referenceService.js";

const referenceRouter = Router();

referenceRouter.get("/:refId", getById);
referenceRouter.get("/user/:userId", getAll);
referenceRouter.post("/", saveAll);
referenceRouter.put("/:refId", update);
referenceRouter.delete("/:refId", cancel);

export default referenceRouter;