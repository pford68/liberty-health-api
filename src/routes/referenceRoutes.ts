import {Router} from "express";
import {cancel, getById, save, update} from "../services/referenceService.js";

const referenceRouter = Router();

referenceRouter.get("/:refId", getById);
referenceRouter.post("/", save);
referenceRouter.put("/:refId", update);
referenceRouter.delete("/:refId", cancel);

export default referenceRouter;