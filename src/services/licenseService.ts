import type {Request, Response, NextFunction} from "express";
import License, {type LicensePayload} from "../model/License.js";
import licenseDao from "../dao/LicenseDao.js";


export const saveAll = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    try {
        const licenses: License[] = body.map((data: LicensePayload) => License.create(data));
        const result = await licenseDao.saveAll(licenses);
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
        const license = License.create(body);
        const result = await licenseDao.update(license);
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
            const licenses = await licenseDao.getByUserId(parsedId);
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

export const getById = async (req: Request, res: Response, next: NextFunction) => {
    throw new Error("Not implemented");
};