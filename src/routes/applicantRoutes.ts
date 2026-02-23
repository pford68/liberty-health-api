import {Router} from "express";
import {
    save,
    cancel,
    getApplicationByEmail,
    update
} from "../services/applicantService.js";

const applicantRouter = Router();

applicantRouter.get("/:email", getApplicationByEmail);
applicantRouter.post("/:applicantId", save);
applicantRouter.put("/:applicantId", update);
applicantRouter.delete("/:applicantId", cancel);

export default applicantRouter;