import {isString} from "../util/validations.js";
import JobReference from "./JobReference.js";

export interface Location {
    city: string,
    state: string,
    country: string
}

export interface Company {
    name: string,
    address1: string,
    address2: string,
    phone: string
}

interface JobPayload {
    id: number | null
    title: string
    startDate: Date
    endDate?: Date
    reasonForLeaving: string
    supervisor: JobReference
    company: Company
    location: Location
}

export default class Job {
    #id: number | null
    #title: string
    #startDate?: Date
    #endDate?: Date
    #reasonForLeaving?: string
    #supervisor?: JobReference
    #company?: Company
    #location?: Location

    static create(data: JobPayload): Job {
        const job = new Job(data.id, data.title);
        job.company = data.company;
        job.startDate = data.startDate;
        if (data.endDate != undefined) {
            job.endDate = data.endDate;
        }
        job.reasonForLeaving = data.reasonForLeaving;
        job.supervisor = data.supervisor;
        job.location = data.location;
        return job;
    }

    constructor(id:number | null, title: string) {
        this.#id = id;
        this.#title = title;
    }

    get id(): number | null {
        return this.#id;
    }

    get startDate(): Date | undefined {
        return this.#startDate;
    }

    set startDate(value: Date) {
        this.#startDate = value;
    }

    get endDate(): Date | undefined {
        return this.#endDate;
    }

    set endDate(value: Date) {
        this.#endDate = value;
    }

    get reasonForLeaving(): string | undefined {
        return this.#reasonForLeaving;
    }

    set reasonForLeaving(value: string) {
        this.#reasonForLeaving = value;
    }

    get supervisor(): JobReference | undefined {
        return this.#supervisor;
    }

    set supervisor(value: JobReference) {
        this.#supervisor = value;
    }

    get company(): Company | undefined {
        return this.#company;
    }

    set company(value: Company) {
        this.#company = value;
    }

    get location(): Location | undefined {
        return this.#location;
    }

    set location(value: Location) {
        this.#location = value;
    }


    get title(): string {
        return this.#title;
    }

    set title(value: string) {
        this.#title = value;
    }

    validate(): boolean {
        const validations = [
            () => isString(this.title),
            () => isString(this.reasonForLeaving),
            // valid start date
            // valid end date
            // valid supervisor
            // valid location
            // valid company
        ];
        for (let validation of validations) {
            if (!validation()) return false;
        }
        return true;
    }

    toJSON(): unknown {
        return {
            title: this.title,
            startDate: this.startDate,
            endDate: this.endDate,
            reasonForLeaving: this.reasonForLeaving,
            supervisor: this.supervisor,
            company: this.company,
            location: this.location,
        };
    }
}