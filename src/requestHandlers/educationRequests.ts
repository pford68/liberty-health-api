import type {Request, Response, NextFunction} from "express";
import educationService from "../services/educationService.js";


export const saveAll =  async (req: Request, res:Response, next:NextFunction) => {
    const { body } = req;
    try {
        const education = await educationService.saveAll(body);
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
            const education = await educationService.getByApplicantId(parsedId);
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
        const result = await educationService.update(body);
        if (!result) throw new Error("Update attempt failed.");
        res.status(204);
    } catch (e) {
        res
            .status(500)
            .json({message: (e as Error).message});
    }
}
