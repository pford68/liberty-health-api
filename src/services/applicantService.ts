import type {Request, Response, NextFunction} from "express";
import applicantDao from "../dao/ApplicantDao.js";


export const save = async (req: Request, res: Response, next: NextFunction) => {

};

export const update = async (req: Request, res: Response, next: NextFunction) => {

};

export const cancel = async (req: Request, res: Response, next: NextFunction) => {

};

export const getApplication = async (req: Request, res: Response, next: NextFunction) => {
    const {email} = req.query;
    if (email == undefined) {
        throw new Error("An email address is required.")
    }
    const applicant = await applicantDao.getByEmail(decodeURIComponent(email.toString()))
    res.json(applicant)
};