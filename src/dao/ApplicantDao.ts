import Applicant, {type ApplicationData} from "../model/Applicatant.js";
import connection from "./connection.js";
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
            ? new Applicant({
                id: result["applicant_id"],
                firstName: result["first_name"],
                lastName: result["last_name"],
                email: result["email"],
                position: {id: result["position_id"], title: result["position"]},
                status: {id: result["status_id"], value: result["status"]},
                phone: result["phone"],
                eligibleToWork: result["eligible_to_work"] == 1,
                convictions: result["has_convictions"] == 1
            })
            : undefined;
    }

    async save(applicant: Applicant) {
        const stmt = Applicant.queries.save;
        const {data} = applicant;
        const params = {
            ...data,
            position: data.position?.id,
            status: data.status?.id,
        };
        const {id} = await connection.save(stmt, params) ?? {};
        return id ?? 0;
    }

    async update(applicant: Applicant) {
        const {data} = applicant
        const stmt = new QueryBuilder()
            .update(Applicant, ...Object.keys(data))
            .build();
        const {affectedRows} = await connection.save(stmt, data) ?? {};
        return (affectedRows ?? 0) > 0;
    }

}

export default new ApplicantDao();