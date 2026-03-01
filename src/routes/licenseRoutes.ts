import {Router} from "express";
import {cancel, getById, getAll, saveAll, update} from "../services/licenseService.js";

const licenseRouter = Router();

licenseRouter.get("/:refId", getById);
licenseRouter.get("/user/:userId", getAll);
licenseRouter.post("/", saveAll);
licenseRouter.put("/:refId", update);
licenseRouter.delete("/:refId", cancel);

export default licenseRouter;