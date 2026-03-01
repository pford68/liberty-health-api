import type {Request, Response, NextFunction} from "express";
import {isEmail} from "../util/validations.js";
import logger from "../logging/Logger.js";
import applicantService from "../services/applicantService.js";


export const save = async (req: Request, res: Response, next: NextFunction) => {
    const {body} = req;
    try {
        const id = await applicantService.save(body);
        if (id == null) {
            throw new Error("Save attempt failed");
        }
        res
            .status(201)
            .json({id});
    } catch (e) {
        const message = (e as Error).message;
        logger.error(message);
        res
            .status(500).json({message});
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const {body} = req;
    try {
        const result = await applicantService.update(body);
        if (!result) {
            throw new Error("Update attempt failed.");
        }
        res
            .status(204);
    } catch (e) {
        const message = (e as Error).message;
        logger.error(message);
        res
            .status(500).json({message});
    }
};

export const getApplication = async (req: Request, res: Response, next: NextFunction) => {
    const {email} = req.query;
    if (email == null || !isEmail(email.toString())) {
        const message = "Bad request: provide a valid email address in the query."
        logger.debug(message);
        res
            .status(400)
            .send({message})
    } else {
        try {
            const decodedEmail = decodeURIComponent(email.toString());
            const applicant = await applicantService.getApplication(decodedEmail);
            if (applicant == null) {
                res.status(404).json({message: "Application not found"});
            } else {
                res
                    .status(200)
                    .json({applicant});
            }
        } catch (e) {
            const message = (e as Error).message;
            logger.error(`An error occurred while retrieving the application: ${message}`);
            res
                .status(500)
                .send({message});
        }
    }
};