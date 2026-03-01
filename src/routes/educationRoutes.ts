import {Router} from "express";
import {getByApplicantId, saveAll, update} from "../requestHandlers/educationRequests.js";

const educationRouter = Router();

educationRouter.get("/user/:userId", getByApplicantId);
educationRouter.post("/", saveAll);
educationRouter.put("/:schoolId", update);


export default educationRouter;