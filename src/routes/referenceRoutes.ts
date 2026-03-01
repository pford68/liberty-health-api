import {Router} from "express";
import {getAll, saveAll, update} from "../requestHandlers/referenceRequests.js";

const referenceRouter = Router();

referenceRouter.get("/user/:userId", getAll);
referenceRouter.post("/", saveAll);
referenceRouter.put("/:refId", update);

export default referenceRouter;