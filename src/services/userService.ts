import type {Request, Response, NextFunction} from 'express';
import userDao from "../dao/UserDao.js";
import type User from "../model/User.js";


export const getUserById = async (req:Request, res:Response, next:NextFunction) => {
    const {userId} = req.params;
    const parsedUserId = Number(userId);
    if (isNaN(parsedUserId)) throw new Error("Invalid userId.");
    const user:User | undefined = await userDao.getById(parsedUserId);
    res.json(user);
};

export const getAllActive = async (req: Request, res: Response, next: NextFunction) => {
    const users:User[] = await userDao.getActiveUsers();
    res.json(users);
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