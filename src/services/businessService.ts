import businessDao from "../dao/BusinessDao.js";

class BusinessService {
    async getStatuses() {
        return await businessDao.getStatuses();
    }

    async getLicenseTypes() {
        return await businessDao.getLicenseTypes();
    }

    async getOpenPositions() {
        return await businessDao.getPositions();
    }
}

export default new BusinessService();