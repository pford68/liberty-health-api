import {Router} from "express";
import {
    save,
    cancel,
    getApplication,
    update
} from "../services/applicantService.js";

const applicantRouter = Router();

applicantRouter.get("/search", getApplication);
applicantRouter.post("/", save);
applicantRouter.put("/:applicantId", update);
applicantRouter.delete("/:applicantId", cancel);

export default applicantRouter;