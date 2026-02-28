import {Router} from "express";
import {cancel, getByApplicantId, saveAll, update} from "../services/educationService.js";

const educationRouter = Router();

educationRouter.get("/user/:userId", getByApplicantId);
educationRouter.post("/", saveAll);
educationRouter.put("/:schoolId", update);
educationRouter.delete("/:schoolId", cancel);


export default educationRouter;