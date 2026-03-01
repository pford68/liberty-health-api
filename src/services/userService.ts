import type {Request, Response, NextFunction} from 'express';
import userDao from "../dao/UserDao.js";
import type User from "../model/User.js";

class UserService {
    getUserById = async (userId: number) => {
        return await userDao.getById(userId);
    };

    getAllActive = async () => {
        return await userDao.getActiveUsers();
    }

    authenticateUser = async (userId: number) => {
        // Query user
        // If user found, set last login and create JWT
    }
}

export default new UserService();