import type {Request, Response, NextFunction} from 'express';
import connection from "../config/connection.js";


export const getUserById = async (req:Request, res:Response, next:NextFunction) => {
    const {userId} = req.params;
    const parsedUserId = Number(userId);
    if (isNaN(parsedUserId)) throw new Error("Invalid userId.");
    const stmt = "SELECT user_id, user_name, email FROM users WHERE user_id = ?";
    const results = await connection.execute(stmt, [parsedUserId]);
    res.json(results);
};

export const getAllActive = async (req: Request, res: Response, next: NextFunction) => {
    const stmt = "SELECT user_id, user_name, email FROM users";
    const results = await connection.execute(stmt, []);
    res.json(results);
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