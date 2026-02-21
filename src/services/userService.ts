import type {Request, Response, NextFunction} from 'express';


class UserService {
    getUserById(req: Request, res: Response, next: NextFunction): void {
        const {userId} = req.params;
        res.json({id: userId, name: "Test"});
    }

    create(req: Request, res: Response, next: NextFunction): void {
        const {body} = req;
        try {
            const data = JSON.parse(body);
        } catch(e) {

        } finally {
            next();
        }
    }
}

export default new UserService();