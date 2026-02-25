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
        const row = results?.[0];
        return row !== undefined
            ? this.#transform(row)
            : undefined;
    }

    async getActiveUsers() {
        const stmt = "SELECT user_id, user_name, email, admin FROM users WHERE active = 1";
        const results = await connection.execute(stmt, []);
        return results?.map((row:RowDataPacket) => {
            return this.#transform(row);
        }) ?? []
    }

    deleteUser(id: number) {

    }

    #transform(row:RowDataPacket): User {
        return new User(
            row["user_id"],
            row["user_name"],
            row["email"],
            row["admin"]
        )
    }
}

export default new UserDao();