import applicantDao from "../dao/ApplicantDao.js";
import Applicant, {type ApplicationData} from "../model/Applicatant.js";


class ApplicantService {
    save = async (body: ApplicationData) => {
        const applicant = new Applicant(body);
        const {position, status} = applicant;
        if (position == undefined) {
            throw new Error(`position cannot be undefined in a save operation.`)
        }
        if (status == undefined) {
            throw new Error(`status cannot be undefined in a save operation.`)
        }

        return await applicantDao.save(applicant);
    }

    update = async (body: ApplicationData) => {
        const applicant = new Applicant(body);
        return await applicantDao.update(applicant)
    }

    getApplication = async (email: string) => {
        return await applicantDao.getByEmail(email);
    }
}

export default new ApplicantService();