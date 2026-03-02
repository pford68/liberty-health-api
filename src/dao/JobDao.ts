import Job from "../model/Job.js";
import connection from "./connection.js";
import logger from "../logging/Logger.js";
import QueryBuilder from "./QueryBuilder.js";

class JobDao {
    async getById(id: number) {
        const {byId} = Job.queries;
        const results = await connection.execute(byId, [id]);
        const row = results?.[0];
        return row != undefined ? Job.transform(row) : undefined;
    }

    async getJobHistory(applicantId: number) {
        const {byApplicantId} =Job.queries;
        const results = await connection.execute(byApplicantId, [applicantId]);
        return results?.map((row) => {
            return Job.transform(row);
        }) ?? [];
    }

    async save(job: Job) {
        const {save} = Job.queries;
        const {id} = await connection.save(save, job.values) ?? {};
        if (id === undefined) {
            throw new Error("Save attempt failed");
        }
        return id;
    }

    async saveAll(jobs: Job[]) {
        const values = jobs.map((job: Job) => job.values);
        logger.info(values);

        const {saveAll} = Job.queries;
        const result = await connection.saveAll(saveAll, [values]);
        if (result?.id === undefined) {
            throw new Error("Save attempt failed");
        }
        return result;
    }

    async update(job: Job) {
        const {data} = job;
        logger.info(data)
        const stmt = new QueryBuilder()
            .update(Job, Object.keys(data))
            .build();
        const {affectedRows} = await connection.save(stmt, job.entries) ?? {};
        return affectedRows !== undefined ? affectedRows > 0 : false;
    }
}

export default new JobDao();