import connection from "./connection.js";
import {LicenseType} from "../model/License.js";
import Status from "../model/Status.js";
import Position from "../model/Position.js";

class BusinessDao {
    async getLicenseTypes() {
        const stmt = "SELECT * FROM license_types";
        const results = await connection.execute(stmt, []);
        return results?.map((row) => {
            return new LicenseType(row["license_id"], row["value"]);
        }) ?? [];
    }

    async getStatuses() {
        const stmt = "SELECT * FROM status";
        const results = await connection.execute(stmt, []);
        return results?.map((row) => {
            return new Status(row["status_id"], row["value"]);
        }) ?? [];
    }

    async getPositions() {
        const stmt = "SELECT * FROM positions WHERE status_id = 1";
        const results = await connection.execute(stmt, []);
        return results?.map((row) => {
            return new Position(row["position_id"], row["title"]);
        }) ?? [];
    }
}

export default new BusinessDao();