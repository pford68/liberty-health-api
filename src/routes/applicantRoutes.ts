import {Router} from "express";
import {getApplication, save, update} from "../requestHandlers/applicantRequests.js";

//============================ Private
const applicantRouter = Router();

//============================ Routing
applicantRouter.get("/search", getApplication);
applicantRouter.post("/", save);
applicantRouter.put("/:applicantId", update);

//============================ Exports
export default applicantRouter;