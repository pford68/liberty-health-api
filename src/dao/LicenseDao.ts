import License from "../model/License.js";
import connection from "./connection.js";
import logger from "../logging/Logger.js";

class LicenseDao {
    async getById(id: number) {
        const {byId} = License.queries;
        const results = await connection.execute(byId, [id]);
        const row = results?.[0];
        return row != undefined ? License.transform(row) : undefined;
    }

    async getByUserId(applicantId: number) {
        const {all} = License.queries;
        const results = await connection.execute(all, [applicantId]);
        return results?.map((row) => {
            return License.transform(row);
        }) ?? [];
    }

    async save(license: License) {
        const {save} = License.queries;
        const {id} = await connection.save(save, license.values) ?? {};
        if (id === undefined) throw new Error("Save attempt failed");
        return id;
    }

    async saveAll(licenses: License[]) {
        const values = licenses.map((license: License) => license.values);
        logger.info(values);

        const {saveAll} = License.queries;
        const result = await connection.saveAll(saveAll, [values]);
        if (result?.id === undefined) throw new Error("Save attempt failed");
        return result;
    }

    async update(license: License) {
        const {update} = License.queries;
        logger.info(update)
        const {affectedRows} = await connection.save(update, license.entries) ?? {};
        return affectedRows !== undefined ? affectedRows > 0 : false;
    }

    async cancel(id: number) {
        throw new Error("Not implemented");
    }

}

export default new LicenseDao();