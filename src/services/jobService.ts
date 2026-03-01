import type {Request, Response, NextFunction} from "express";
import jobDao from "../dao/JobDao.js";
import Job, {type JobPayload} from "../model/Job.js";

class JobService {
    save = async (data: JobPayload) => {
        const job = Job.create(data);
        return await jobDao.save(job);
    };

    saveAll = async (data: JobPayload[]) => {
        const jobs: Job[] = data.map((data: JobPayload) => Job.create(data));
        return await jobDao.saveAll(jobs);

    };

    update = async (data: JobPayload) => {
        const job = Job.create(data);
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