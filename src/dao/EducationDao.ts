import connection from "./connection.js";
import Education from "../model/Education.js";
import logger from "../logging/Logger.js";

class EducationDao {

    async getById(id: number) {
        const {byId} =Education.queries;
        const results = await connection.execute(byId, [id]);
        const row = results?.[0];
        return row != undefined ? Education.transform(row) : undefined;
    }

    async getByApplicantId(applicantId: number) {
        const {byApplicantId} =Education.queries;
        const results = await connection.execute(byApplicantId, [applicantId]);
        return results?.map((row) => {
            return Education.transform(row);
        }) ?? [];
    }

    async save(school: Education) {
        const {save} = Education.queries;
        const {id} = await connection.save(save, school.values) ?? {};
        if (id === undefined) throw new Error("Save attempt failed");
        return id;
    }

    async saveAll(schools: Education[]) {
        const values = schools.map((school: Education) => school.values);
        console.dir(values);

        const {saveAll} = Education.queries;
        const result = await connection.saveAll(saveAll, [values]);
        if (result?.id === undefined) throw new Error("Save attempt failed");
        return result;
    }

    async update(school: Education) {
        const {update} = Education.queries;
        logger.info(update)
        const {affectedRows} = await connection.save(update, school.entries) ?? {};
        return affectedRows !== undefined ? affectedRows > 0 : false;
    }

}

export default new EducationDao();