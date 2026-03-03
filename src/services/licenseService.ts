import License, {type LicenseData} from "../model/License.js";
import licenseDao from "../dao/LicenseDao.js";


class LicenseService {

    saveAll = async (data: LicenseData[]) => {
        const licenses: License[] = data.map((data: LicenseData) => new License(data));
        return await licenseDao.saveAll(licenses);
    };

    update = async (data: LicenseData) => {
        const license = new License(data);
        return await licenseDao.update(license);
    };


    getAll = async (userId: number) => {
        return await licenseDao.getByUserId(userId);
    };
}


export default new LicenseService();