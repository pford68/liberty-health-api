import type {Request, Response, NextFunction} from 'express';
import userDao from "../dao/UserDao.js";
import type User from "../model/User.js";


export const getUserById = async (req:Request, res:Response, next:NextFunction) => {
    const {userId} = req.params;
    const parsedUserId = Number(userId);
    if (isNaN(parsedUserId)) {
        res
            .status(400)
            .json({message: "Bad request: the user id must be a number."});
    }
    try {
        const user: User | undefined = await userDao.getById(parsedUserId);
        if (user == undefined) {
            res
                .status(404)
                .json({message: "User not found."})
        }
        res
            .status(200)
            .json(user);
    } catch (e) {
        res
            .status(500)
            .json({message: (e as Error).message});
    }
};

export const getAllActive = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users:User[] = await userDao.getActiveUsers();
        res
            .status(200)
            .json(users);
    } catch (e) {
        res
            .status(500)
            .json({message: (e as Error).message});
    }
}

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    // Query user
    // If user found, set last login and create JWT
}

export const createUser = (req:Request, res:Response, next:NextFunction) => {

}

export const updateUser = (req:Request, res:Response, next:NextFunction) => {

}

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {

}