import type {Request, Response, NextFunction} from 'express';
import connection from "../config/connection.js";


/* GET home page. */
export const getUserById = async (req:Request, res:Response, next:NextFunction) => {
    const {userId} = req.params;
    const parsedUserId = Number(userId);
    if (isNaN(parsedUserId)) throw new Error("Invalid userId.");
    const stmt = "SELECT user_id, user_name, email FROM users WHERE user_id = ?";
    const results = await connection.execute(stmt, [parsedUserId]);
    res.json(results);
};

export const create = (req:Request, res:Response, next:NextFunction) => {

}