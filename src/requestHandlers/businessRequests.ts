import type {Request, Response, NextFunction} from "express";
import businessService from "../services/businessService.js";
import logger from "../logging/Logger.js";

export async function getStatuses(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await businessService.getStatuses();
        res
            .status(200)
            .json(result)
    } catch (e) {
        const message = (e as Error).message;
        logger.error(message);
        res
            .status(500).json({message});
    }
}

export async function getLicenseTypes(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await businessService.getLicenseTypes();
        res
            .status(200)
            .json(result)
    } catch (e) {
        const message = (e as Error).message;
        logger.error(message);
        res
            .status(500).json({message});
    }
}

export async function getOpenPositions(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await businessService.getOpenPositions();
        res
            .status(200)
            .json(result)
    } catch (e) {
        const message = (e as Error).message;
        logger.error(message);
        res
            .status(500).json({message});
    }
}