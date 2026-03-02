import JobReference from "../model/JobReference.js";
import connection from "./connection.js";
import logger from "../logging/Logger.js";
import QueryBuilder from "./QueryBuilder.js";

class ReferenceDao {

    async getAll(applicantId: number) {
        const {byApplicantId} = JobReference.queries;
        const results = await connection.execute(byApplicantId, [applicantId]);
        return results?.map((row) => {
            return JobReference.transform(row);
        }) ?? [];
    }

    async saveAll(refs: JobReference[]) {
        const values = refs.map((ref: JobReference) => ref.values);
        logger.debug(values);

        const {saveAll} = JobReference.queries;
        const result = await connection.saveAll(saveAll, [values]);
        if (result?.id === undefined) throw new Error("Save attempt failed");
        return result ?? 0;
    }

    async update(ref: JobReference) {
        const {data} = ref;
        const stmt = new QueryBuilder()
            .update(JobReference, Object.keys(data))
            .build();
        logger.debug(stmt)
        const {affectedRows} = await connection.save(stmt, ref.entries) ?? {};
        return affectedRows !== undefined ? affectedRows > 0 : false;
    }
}

export default new ReferenceDao();