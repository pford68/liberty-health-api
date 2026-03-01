import JobReference, {type ReferencePayload} from "../model/JobReference.js";
import referenceDao from "../dao/ReferenceDao.js";

class ReferenceService {
    saveAll = async (data: ReferencePayload[]) => {
            const refs: JobReference[] = data.map((data: ReferencePayload) => JobReference.create(data));
            return await referenceDao.saveAll(refs);
    };

    update = async (data: ReferencePayload) => {
            const ref = JobReference.create(data);
            return await referenceDao.update(ref);
    };

    getAll = async (userId: number) => {
           return await referenceDao.getAll(userId);
    };

}

export default new ReferenceService();