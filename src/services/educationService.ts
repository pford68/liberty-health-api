import type {Request, Response, NextFunction} from "express";
import Education, {type EducationPayload} from "../model/Education.js";
import educationDao from "../dao/EducationDao.js";
import jobDao from "../dao/JobDao.js";


export const saveAll =  async (req: Request, res:Response, next:NextFunction) => {
    const { body } = req;
    try {
        const schools: Education[] = body.map((data: EducationPayload) => Education.create(data));
        const education = await educationDao.saveAll(schools);
        res
            .status(201)
            .json({education});
    } catch (e) {
        res
            .status(500)
            .json({message: (e as Error).message});
    }
}

export const getByApplicantId = async (req: Request, res:Response, next:NextFunction) => {
    const {userId} = req.params;
    const parsedId = Number(userId);
    if (userId == undefined || isNaN(parsedId)) {
        res
            .status(400)
            .json({message: "Bad request: an applicant id is required."});
    } else {
        try {
            const education = await educationDao.getByApplicantId(parsedId);
            if (education === undefined) {
                res
                    .status(404)
                    .json({message: "Education history not found"});
            } else {
                res
                    .status(200)
                    .json({education});
            }
        } catch (e) {
            res
                .status(500)
                .json({message: (e as Error).message});
        }
    }
}

export const update = async (req: Request, res:Response, next:NextFunction) => {
    const { body } = req;
    try {
        const school = Education.create(body);
        const result = await educationDao.update(school);
        if (!result) throw new Error("Update attempt failed.");
        res.status(204);
    } catch (e) {
        res
            .status(500)
            .json({message: (e as Error).message});
    }
}

export const cancel =  async (req: Request, res:Response, next:NextFunction) => {
    throw new Error("Not implemented");
}