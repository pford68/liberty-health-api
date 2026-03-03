import Education, {type EducationData} from "../model/Education.js";
import educationDao from "../dao/EducationDao.js";

class EducationService {
    saveAll = async (payload: EducationData[]) => {
        const schools: Education[] = payload.map((data: EducationData) => new Education(data));
        return await educationDao.saveAll(schools);
    }

    getByApplicantId = async (id: number) => {
        return await educationDao.getByApplicantId(id);
    }

    update = async (payload: EducationData) => {
        const school = new Education(payload);
        return await educationDao.update(school);
    }
}

export default new EducationService();