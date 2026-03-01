import {Router} from "express";
import {getAll, saveAll, update} from "../requestHandlers/licenseRequests.js";

const licenseRouter = Router();

licenseRouter.get("/user/:userId", getAll);
licenseRouter.post("/", saveAll);
licenseRouter.put("/:refId", update);

export default licenseRouter;