import type {Request, Response, NextFunction} from "express";
import jobDao from "../dao/JobDao.js";
import Job from "../model/Job.js";


export const save = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    try {
        const job = Job.create(body);
        const id = await jobDao.save(job);
        res
            .status(201)
            .json({id});
    } catch (e) {
        res
            .status(500)
            .json({message: (e as Error).message});
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    try {
        const job = Job.create(body);
        const result = await jobDao.update(job);
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

export const getByUserId = async (req: Request, res: Response, next: NextFunction) => {
    const {userId} = req.params;
    const parsedId = Number(userId);
    if (userId == undefined || isNaN(parsedId)) {
        res
            .status(400)
            .json({message: "Bad request: a job id is required."});
    } else {
        try {
            const result = await jobDao.getJobHistory(parsedId);
            if (result === undefined) {
                res
                    .status(404)
                    .json({message: "Job not found"});
            }
            res
                .status(200)
                .json(result);
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
            const result = await jobDao.getById(parsedId);
            if (result === undefined) {
                res
                    .status(404)
                    .json({message: "Job not found"});
            }
            res
                .status(200)
                .json(result);
        } catch (e) {
            res
                .status(500)
                .json({message: (e as Error).message});
        }
    }
};