import type {Request, Response, NextFunction} from "express";
import jobService from "../services/jobService.js";


export const save = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    try {
        const id = await jobService.save(body);
        res
            .status(201)
            .json({id});
    } catch (e) {
        res
            .status(500)
            .json({message: (e as Error).message});
    }
};

export const saveAll = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    try {
        const result = await jobService.saveAll(body);
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
        const result = await jobService.update(body);
        if (!result) throw new Error("Update attempt failed.");
        res.status(204);
    } catch (e) {
        res
            .status(500)
            .json({message: (e as Error).message});
    }
};


export const getByUserId = async (req: Request, res: Response, next: NextFunction) => {
    const {userId} = req.params;
    const parsedId = Number(userId);
    if (userId == undefined || isNaN(parsedId)) {
        res
            .status(400)
            .json({message: "Bad request: an applicant id is required."});
    } else {
        try {
            const jobHistory = await jobService.getByUserId(parsedId);
            if (jobHistory === undefined) {
                res
                    .status(404)
                    .json({message: "Job history not found"});
            } else {
                res
                    .status(200)
                    .json({jobHistory});
            }
        } catch (e) {
            res
                .status(500)
                .json({message: (e as Error).message});
        }
    }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const parsedId = Number(id);
    if (id == undefined || isNaN(parsedId)) {
        res
            .status(400)
            .json({message: "Bad request: a job id is required."});
    } else {
        try {
            const job = await jobService.getById(parsedId);
            if (job === undefined) {
                res
                    .status(404)
                    .json({message: "Job not found"});
            }
            res
                .status(200)
                .json({job});
        } catch (e) {
            res
                .status(500)
                .json({message: (e as Error).message});
        }
    }
};