import type {Request, Response, NextFunction} from "express";
import applicantDao from "../dao/ApplicantDao.js";
import {isEmail} from "../util/validations.js";
import Applicant from "../model/Applicatant.js";
import logger from "../logging/Logger.js";


export const save = async (req: Request, res: Response, next: NextFunction) => {
    const {body} = req;
    try {
        const applicant = Applicant.create(body);
        const id = await applicantDao.save(applicant);
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
        const applicant = Applicant.create(body);
        const result = await applicantDao.update(applicant);
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

export const cancel = async (req: Request, res: Response, next: NextFunction) => {
    throw new Error("Not implemented");
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
            const applicant = await applicantDao.getByEmail(decodedEmail);
            res
                .status(200)
                .json(applicant ?? []);
        } catch (e) {
            const message = (e as Error).message;
            logger.error(`An error occurred while retrieving the application: ${message}`);
            res
                .status(500)
                .send({message});
        }
    }
};