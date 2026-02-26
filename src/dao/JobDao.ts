import Job from "../model/Job.js";
import connection from "./connection.js";

class JobDao {
    async getById(id: number) {
        const stmt = "SELECT * FROM job_history WHERE job_id = ?";
        const results = await connection.execute(stmt, [id]);
        const row = results?.[0];
        row != undefined ? Job.transform(row) : undefined;
    }

    async getJobHistory(userId: number) {
        const stmt = "SELECT * FROM job_history WHERE applicant_id = ?";
        const results = await connection.execute(stmt, [userId]);
        return results?.map((row) => {
            return Job.transform(row);
        }) ?? [];
    }

    async save(job: Job) {
        const params = this.#getParams(job);
        const cols = Object.values(Job.columns);
        const values = Object.entries(params)
            .map(([key, value]) => {
                if (typeof value === "string") return `"${value}"`;
                if (value == null) return "";
                if (key === "supervisor") return `'${JSON.stringify(value)}'`;
                return value;
            });
        const stmt = [
            `INSERT INTO job_history (${cols.join(",")})`,
            `VALUES(${values.join(",")})`,
        ].join(" ");
        const {id} = await connection.save(stmt, params) ?? {};
        if (id === undefined) throw new Error("Save attempt failed");
        return id ?? 0;
    }

    async update(job: Job) {
        const params = {
            id: job.id,
            ...this.#getParams(job)
        }
        const placeholders = Job.namedPlaceholders;
        const stmt = [
            "UPDATE job_history",
            `SET ${placeholders.join(",")}`,
            "WHERE job_id = ?"
        ].join(" ");
        console.log(stmt)
        const {affectedRows} = await connection.save(stmt, params) ?? {};
        return affectedRows !== undefined ? affectedRows > 0 : false;
    }

    async cancel(id: number) {

    }

    #getParams(job: Job) {
        return {
            applicantId: job.applicantId,
            title: job.title,
            company: job.company?.name,
            startDate: job.startDate,
            endDate: job.endDate,
            reasonForLeaving: job.reasonForLeaving,
            phone: job.company?.phone,
            address1: job.company?.address1,
            address2: job.company?.address2 ?? "",
            city: job.location?.city,
            state: job.location?.state,
            country: job.location?.country,
        };
    }
}

export default new JobDao();