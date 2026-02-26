import connection from "./connection.js";
import User from "../model/User.js";


class UserDao {

    async getById(userId: number) {
        const {byId} = User.queries;
        const results = await connection.execute(byId, [userId]);
        const row = results?.[0];
        return row !== undefined
            ? User.transform(row)
            : undefined;
    }

    async getActiveUsers() {
        const {all} = User.queries;
        const results = await connection.execute(all, []);
        return results?.map((row:{[k:string]:any}) => {
            return User.transform(row);
        }) ?? []
    }

    deleteUser(id: number) {

    }

}

export default new UserDao();