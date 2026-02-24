import connection from "./connection.js";
import User from "../model/User.js";
import type {RowDataPacket} from "mysql2/promise";


class UserDao {

    async getById(userId: number) {
        const stmt = [
            "SELECT user_id, user_name, email, admin FROM users",
            "WHERE user_id = ? AND active = 1",
        ].join(" ");
        const results = await connection.execute(stmt, [userId]);
        const r = results?.[0];
        return r !== undefined
            ? new User(r["user_id"], r["user_name"],r["email"], r["admin"])
            : undefined;
    }

    async getActiveUsers() {
        const stmt = "SELECT user_id, user_name, email, admin FROM users WHERE active = 1";
        const results = await connection.execute(stmt, []);
        const users: User[] = [];
        results?.forEach((u: RowDataPacket) => {
            const user = new User(u["user_id"], u["user_name"],u["email"], u["admin"]);
            users.push(user);
        });
        return users;
    }

    deleteUser(id: number) {

    }


}

export default new UserDao();