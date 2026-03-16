import {Router} from "express";
import {getApplication, save, update} from "../requestHandlers/applicantRequests.js";
import {getLicenseTypes, getOpenPositions, getStatuses} from "../requestHandlers/businessRequests.js";

//============================ Private
const applicantRouter = Router();

//============================ Routing
applicantRouter.get("/search", getApplication);
applicantRouter.post("/", save);
applicantRouter.put("/:applicantId", update);
applicantRouter.get("/status-list", getStatuses);
applicantRouter.get("/license-types", getLicenseTypes);
applicantRouter.get("/positions", getOpenPositions);

//============================ Exports
export default applicantRouter;