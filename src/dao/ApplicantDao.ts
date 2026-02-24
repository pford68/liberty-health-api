import Applicant, {Position, Status} from "../model/Applicatant.js";
import connection from "./connection.js";

class ApplicantDao {

    async getByEmail(email:string) {
        const stmt = [
            "SELECT a.applicant_id, a.first_name, a.last_name, a.email, a.phone,",
            "p.position_id, p.title as position, s.status_id, s.value as status",
            "FROM applicants a",
            "LEFT JOIN positions p",
            "USING(position_id)",
            "LEFT JOIN status s",
            "ON a.status_id = s.status_id",
            "WHERE a.email = ?",
        ].join(" ");
        const results = await connection.execute(stmt, [email]);
        const result = results?.[0];
        return result != undefined
            ? new Applicant(
                result["first_name"],
                result["last_name"],
                result["email"],
                new Position(result["position_id"], result["position"]),
                new Status(result["status_id"], result["status"]),
                result["phone"],
            )
            : undefined;
    }

    async save(applicant: Applicant) {
        const params = {
            firstName: applicant.firstName,
            lastName: applicant.lastName,
            email: applicant.email,
            phone: applicant.phone,
            position: applicant.position.id,
            status: applicant.status.id
        };
        const stmt = [
            "INSERT INTO applicants (first_name, last_name, position_id, status_id, email, phone)",
            "values (:firstName, :lastName, :position, :status, :email, :phone)",
        ].join(" ");
        // @ts-ignore
        const result = connection.execute(stmt, params);
        return result !== undefined;
    }

    async update(applicant: Applicant) {
        const stmt = [
            "UPDATE applicants",
            "SET first_name = :firstName, last_name = :lastName,",
            "email = :email, phone = :phone",
            "position_id = position:, status_id = :status",
            "WHERE applicant_id = :applicantId",
        ].join(" ");
        return this.#upsert(applicant, stmt);
    }

    async cancel(id: number) {

    }

    async #upsert(applicant: Applicant, stmt: string) {
        const params = {
            firstName: applicant.firstName,
            lastName: applicant.lastName,
            email: applicant.email,
            phone: applicant.phone,
            position: applicant.position.id,
            status: applicant.status.id,
        };
        // @ts-ignore
        const result = connection.execute(stmt, params);
        return result !== undefined;
    }
}

export default new ApplicantDao();