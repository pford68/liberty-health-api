import type {Request, Response, NextFunction} from 'express';

/* GET home page. */
export const getUserById = (req:Request, res:Response, next:NextFunction) => {
    const {userId} = req.params;
    res.json({id: userId, name: "Test"});
};

export const create = (req:Request, res:Response, next:NextFunction) => {

}