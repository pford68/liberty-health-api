import type {Request, Response, NextFunction} from "express";
import applicantDao from "../dao/ApplicantDao.js";
import {isEmail} from "../util/validations.js";
import Applicant from "../model/Applicatant.js";


export const save = async (req: Request, res: Response, next: NextFunction) => {
    const {body} = req;
    try {
        const applicant = Applicant.create(body);
        const id = await applicantDao.save(applicant);
        res
            .status(201)
            .json({id});
    } catch (e) {
        res
            .status(500)
            .send({message: (e as Error).message});
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const {body} = req;
    try {
        const applicant = Applicant.create(body);
        const result = await applicantDao.update(applicant);
        if (!result) throw new Error("Update attempt failed.");
        res
            .status(204);
    } catch (e) {
        res
            .status(500).json({message: (e as Error).message});
    }
};

export const cancel = async (req: Request, res: Response, next: NextFunction) => {
    throw new Error("Not implemented");
};

export const getApplication = async (req: Request, res: Response, next: NextFunction) => {
    const {email} = req.query;
    if (email == null || !isEmail(email.toString())) {
        res
            .status(400)
            .send("Bad request: provide a valid email address in the query.")
    } else {
        try {
            const decodedEmail = decodeURIComponent(email.toString());
            const applicant = await applicantDao.getByEmail(decodedEmail);
            res
                .status(200)
                .json(applicant ?? []);
        } catch (e) {
            res
                .status(500)
                .send((e as Error).message);
        }
    }
};