import JobReference, {type ReferenceData} from "../model/JobReference.js";
import referenceDao from "../dao/ReferenceDao.js";

class ReferenceService {
    saveAll = async (data: ReferenceData[]) => {
            const refs: JobReference[] = data.map((data: ReferenceData) => new JobReference(data));
            return await referenceDao.saveAll(refs);
    };

    update = async (data: ReferenceData) => {
            const ref = new JobReference(data);
            return await referenceDao.update(ref);
    };

    getAll = async (userId: number) => {
           return await referenceDao.getAll(userId);
    };

}

export default new ReferenceService();