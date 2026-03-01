import JobReference from "../model/JobReference.js";
import connection from "./connection.js";
import Education from "../model/Education.js";
import logger from "../logging/Logger.js";

class ReferenceDao {
    getById(id: number) {

    }

    async getAll(applicantId: number) {
        const {byApplicantId} = JobReference.queries;
        const results = await connection.execute(byApplicantId, [applicantId]);
        return results?.map((row) => {
            return JobReference.transform(row);
        }) ?? [];
    }

    async saveAll(refs: JobReference[]) {
        const values = refs.map((ref: JobReference) => ref.values);
        console.dir(values);

        const {saveAll} = JobReference.queries;
        const result = await connection.saveAll(saveAll, [values]);
        if (result?.id === undefined) throw new Error("Save attempt failed");
        return result ?? 0;
    }

    async update(ref: JobReference) {
        const {update} = JobReference.queries;
        logger.info(update)
        const {affectedRows} = await connection.save(update, ref.entries) ?? {};
        return affectedRows !== undefined ? affectedRows > 0 : false;
    }

    async cancel(id: number) {

    }
}

export default new ReferenceDao();