import jobDao from "../dao/JobDao.js";
import Job, {type JobData} from "../model/Job.js";


class JobService {
    save = async (data: JobData) => {
        const job = new Job(data);
        return await jobDao.save(job);
    };

    saveAll = async (data: JobData[]) => {
        const jobs: Job[] = data.map((data: JobData) => new Job(data));
        return await jobDao.saveAll(jobs);

    };

    update = async (data: JobData) => {
        const job = new Job(data);
        return await jobDao.update(job);
    };


   getByUserId = async (userId: number) => {
       return await jobDao.getJobHistory(userId);
    };


    getById = async (jobId: number) => {
        return await jobDao.getById(jobId);
    }
}

export default new JobService();