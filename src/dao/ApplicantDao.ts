import Applicant from "../model/Applicatant.js";
import connection from "./connection.js";
import Position from "../model/Position.js";
import Status from "../model/Status.js";
import QueryBuilder from "./QueryBuilder.js";

class ApplicantDao {

    async getByEmail(email:string) {
        const stmt = [
            "SELECT a.*,",
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
                result["applicant_id"],
                result["first_name"],
                result["last_name"],
                result["email"],
                new Position(result["position_id"], result["position"]),
                new Status(result["status_id"], result["status"]),
                result["phone"],
                result["eligible_to_work"] == 1,
                [], // TODO
                result["has_convictions"] == 1
            )
            : undefined;
    }

    async save(applicant: Applicant) {
        const stmt = Applicant.queries.save;
        const params = {
            firstName: applicant.firstName,
            lastName: applicant.lastName,
            email: applicant.email,
            phone: applicant.phone,
            position: applicant.position.id,
            status: applicant.status.id,
            eligibleToWork: applicant.eligibleToWork,
            convictions: applicant.convictions
        };

        const {id} = await connection.save(stmt, params) ?? {};
        return id ?? 0;
    }

    async update(applicant: Applicant) {
        const stmt = [
            "UPDATE applicants",
            "SET first_name = :firstName, last_name = :lastName,",
            "email = :email, phone = :phone",
            "position_id = position:, status_id = :status",
            "WHERE applicant_id = :applicantId",
        ].join(" ");
        const params = {
            applicantId: applicant.id,
            firstName: applicant.firstName,
            lastName: applicant.lastName,
            email: applicant.email,
            phone: applicant.phone,
            position: applicant.position.id,
            status: applicant.status.id,
        };
        const {affectedRows} = await connection.save(stmt, params) ?? {};
        return (affectedRows ?? 0) > 0;
    }

    async cancel(id: number) {

    }
}

export default new ApplicantDao();