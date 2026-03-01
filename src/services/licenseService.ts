import License, {type LicensePayload} from "../model/License.js";
import licenseDao from "../dao/LicenseDao.js";


class LicenseService {

    saveAll = async (data: LicensePayload[]) => {
        const licenses: License[] = data.map((data: LicensePayload) => License.create(data));
        return await licenseDao.saveAll(licenses);
    };

    update = async (data: LicensePayload) => {
        const license = License.create(data);
        return await licenseDao.update(license);
    };


    getAll = async (userId: number) => {
        return await licenseDao.getByUserId(userId);
    };
}


export default new LicenseService();