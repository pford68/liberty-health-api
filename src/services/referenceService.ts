import type {Request, Response, NextFunction} from "express";
import JobReference, {type ReferencePayload} from "../model/JobReference.js";
import referenceDao from "../dao/ReferenceDao.js";


export const saveAll = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    try {
        const refs: JobReference[] = body.map((data: ReferencePayload) => JobReference.create(data));
        const result = await referenceDao.saveAll(refs);
        res
            .status(201)
            .json(result);
    } catch (e) {
        res
            .status(500)
            .json({message: (e as Error).message});
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    try {
        const ref = JobReference.create(body);
        const result = await referenceDao.update(ref);
        if (!result) throw new Error("Update attempt failed.");
        res.status(204);
    } catch (e) {
        res
            .status(500)
            .json({message: (e as Error).message});
    }
};

export const cancel = async (req: Request, res: Response, next: NextFunction) => {
    throw new Error("Not implemented");
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    const {userId} = req.params;
    const parsedId = Number(userId);
    if (userId == undefined || isNaN(parsedId)) {
        res
            .status(400)
            .json({message: "Bad request: an applicant id is required."});
    } else {
        try {
            const references = await referenceDao.getAll(parsedId);
            if (references === undefined) {
                res
                    .status(404)
                    .json({message: "References not found"});
            } else {
                res
                    .status(200)
                    .json({references});
            }
        } catch (e) {
            res
                .status(500)
                .json({message: (e as Error).message});
        }
    }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
    throw new Error("Not implemented");
};