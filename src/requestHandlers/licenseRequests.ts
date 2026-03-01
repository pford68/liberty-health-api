import type {Request, Response, NextFunction} from "express";
import licenseService from "../services/licenseService.js";


export const saveAll = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    try {
        const result = await licenseService.saveAll(body);
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
        const result = await licenseService.update(body);
        if (!result) throw new Error("Update attempt failed.");
        res.status(204);
    } catch (e) {
        res
            .status(500)
            .json({message: (e as Error).message});
    }
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
            const licenses = await licenseService.getAll(parsedId);
            if (licenses === undefined) {
                res
                    .status(404)
                    .json({message: "Licenses not found"});
            } else {
                res
                    .status(200)
                    .json({licenses});
            }
        } catch (e) {
            res
                .status(500)
                .json({message: (e as Error).message});
        }
    }
};
