import Job from "../model/Job.js";
import connection from "./connection.js";
import type {RowDataPacket} from "mysql2/promise";

class JobDao {
    async getById(id: number) {
        const stmt = "SELECT * FROM job_history WHERE job_id = ?";
        const results = await connection.execute(stmt, [id]);
        const row = results?.[0];
        row != undefined ? this.#transform(row) : undefined;
    }

    async getJobHistory(userId: number) {
        const stmt = "SELECT * FROM job_history WHERE applicant_id = ?";
        const results = await connection.execute(stmt, [userId]);
        return results?.map((row) => {
            return this.#transform(row);
        }) ?? [];
    }

    async save(job: Job) {

    }

    async update(job: Job) {

    }

    async cancel(id: number) {

    }

    #transform(row:RowDataPacket): Job {
        const job = new Job(row.id, row.title);
        job.company = {
            name: row.company,
            phone: row.phone,
            address1: row.address1,
            address2: row.address2,
        };
        job.startDate = row["start_date"];
        job.endDate = row["end_date"];
        job.reasonForLeaving = row["reason_ended"]
        job.supervisor = row.supervisor;
        job.location = {
            city: row.city,
            state: row.state,
            country: row.country
        };
        return job;
    }
}

export default new JobDao();