import Education, {type EducationPayload} from "../model/Education.js";
import educationDao from "../dao/EducationDao.js";

class EducationService {
    saveAll = async (payload: EducationPayload[]) => {
        const schools: Education[] = payload.map((data: EducationPayload) => Education.create(data));
        return await educationDao.saveAll(schools);
    }

    getByApplicantId = async (id: number) => {
        return await educationDao.getByApplicantId(id);
    }

    update = async (payload: EducationPayload) => {
        const school = Education.create(payload);
        return await educationDao.update(school);
    }
}

export default new EducationService();