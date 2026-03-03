import {type Request, type Response, type NextFunction, Router} from "express";
import userService from "../services/userService.js";
import type User from "../model/User.js";

export const getUser = async (req: Request, res: Response, next: NextFunction) => {{
        const {userId} = req.params;
        const parsedUserId = Number(userId);
        if (isNaN(parsedUserId)) {
            res
                .status(400)
                .json({message: "Bad request: the user id must be a number."});
        }
        try {
            const user: User | undefined = await userService.getUserById(parsedUserId);
            if (user == undefined) {
                res
                    .status(404)
                    .json({message: "User not found."})
            } else {
                res
                    .status(200)
                    .json({user});
            }
        } catch (e) {
            res
                .status(500)
                .json({message: (e as Error).message});
        }
    }};

export const getActiveUsers =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users:User[] = await userService.getAllActive();
        res
            .status(200)
            .json({users});
    } catch (e) {
        res
            .status(500)
            .json({message: (e as Error).message});
    }
}