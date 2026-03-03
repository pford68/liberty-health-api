import License from "../model/License.js";
import connection from "./connection.js";
import logger from "../logging/Logger.js";
import QueryBuilder from "./QueryBuilder.js";

class LicenseDao {

    async getByUserId(applicantId: number) {
        const {all} = License.queries;
        const results = await connection.execute(all, [applicantId]);
        return results?.map((row) => {
            return License.transform(row);
        }) ?? [];
    }

    async saveAll(licenses: License[]) {
        const values = licenses.map((license: License) => license.values);
        logger.debug(values);

        const {saveAll} = License.queries;
        const result = await connection.saveAll(saveAll, [values]);
        if (result?.id === undefined) throw new Error("Save attempt failed");
        return result;
    }

    async update(license: License) {
        const {data} = license;
        const stmt = new QueryBuilder()
            .update(License, ...Object.keys(data))
            .build();
        logger.debug(stmt)
        const {affectedRows} = await connection.save(stmt, license.entries) ?? {};
        return affectedRows !== undefined ? affectedRows > 0 : false;
    }

}

export default new LicenseDao();