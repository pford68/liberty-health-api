import applicantDao from "../dao/ApplicantDao.js";
import Applicant, {type ApplicantPayload} from "../model/Applicatant.js";


class ApplicantService {
    save = async (body: ApplicantPayload) => {
        const applicant = Applicant.create(body);
        return await applicantDao.save(applicant);
    }

    update = async (body: ApplicantPayload) => {
        const applicant = Applicant.create(body);
        return await applicantDao.update(applicant)
    }

    getApplication = async (email: string) => {
        return await applicantDao.getByEmail(email);
    }
}

export default new ApplicantService();