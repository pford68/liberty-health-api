import {isString} from "../util/validations.js";
import type {Location} from "./Location.js";
import type {Entity, NamedQueries} from "./Entity.js";
import Applicant from "./Applicatant.js";

export interface Company {
    name: string,
    address1: string,
    address2?: string,
    phone: string
}

type JobQueries = NamedQueries & {
    byApplicantId: string,
    saveAll: string,
    update: string,
}


export interface JobPayload {
    id: number | null,
    applicantId: number,
    title: string
    startDate: Date
    endDate?: Date
    reasonForLeaving: string
    company: Company
    location: Location,
    description: string,
}

export default class Job implements Entity {

    #id: number | null;
    #applicantId: number;
    #title: string;
    #startDate?: Date;
    #endDate?: Date;
    #reasonForLeaving?: string;
    #company?: Company;
    #location?: Location;
    #address1?: string;
    #address2?: string;
    #phone?: string;
    #description?: string;
    static #table:string = "job_history";
    static #alias:string = "jh";
    static #columns:{[key:string]: string} = {
        id: "job_id",
        applicant_fk: "applicant_id",
        title: "title",
        company: "company",
        startDate: "start_date",
        endDate: "end_date",
        reasonForLeaving: "reason_ended",
        phone: "phone",
        address1: "address1",
        address2: "address2",
        city: "city",
        state: "state",
        country: "country",
        description: "description",
    };
    static #queries:JobQueries = {
        byId:"",
        byApplicantId: "",
        save: "",
        deleteOne: "",
        all: "",
        saveAll: "",
        update: ""
    };



    static get table(): string {
        return this.#table;
    }

    static get alias(): string {
        return this.#alias;
    }

    static get columns(): { [key: string]: string } {
        return this.#columns;
    }

    static get namedPlaceholders(): string[] {
        return Object.entries(Job.columns).map((k, v) => {
            return `${v} = :${k}`;
        });
    }


    static get queries(): JobQueries {
        return this.#queries;
    }


    static {
        const newRecord = Object.values(Job.#columns);
        const id = newRecord.shift();
        const table = Job.#table;
        const placeholders = Job.namedPlaceholders;
        Job.#queries = {
            ...Job.#queries,
            byId:`SELECT * FROM ${table} WHERE ${id} = ?`,
            byApplicantId:`SELECT * FROM ${table} WHERE applicant_id = ?`,
            saveAll: `INSERT INTO ${table} (${newRecord}) VALUES ?`,
            deleteOne: `DELETE FROM ${table} WHERE ${id} = ?`,
            update: `UPDATE ${table} SET ${placeholders.join(",")} WHERE ${id} = ?`
        };
    }

    static create(data: JobPayload): Job {
        const job = new Job(data.id, data.title, data.applicantId);
        job.company = data.company;
        job.startDate = data.startDate;
        if (data.endDate != undefined) {
            job.endDate = data.endDate;
        }
        job.reasonForLeaving = data.reasonForLeaving;
        job.location = data.location;
        job.description = data.description;
        return job;
    }


    static transform(row:{[p:string]: any}): Job {
        const job = new Job(row.id, row.title, row["applicant_id"]);
        job.company = {
            name: row.company,
            phone: row.phone,
            address1: row.address1,
            address2: row.address2,
        };
        job.startDate = row["start_date"];
        job.endDate = row["end_date"];
        job.reasonForLeaving = row["reason_ended"]
        job.location = {
            city: row.city,
            state: row.state,
            country: row.country
        };
        return job;
    }

    constructor(id:number | null, title: string, applicantId: number) {
        this.#id = id;
        this.#title = title;
        this.#applicantId = applicantId;
    }

    get id(): number | null {
        return this.#id;
    }

    get applicantId(): number {
        return this.#applicantId;
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

    get address1(): string | undefined {
        return this.#address1;
    }

    set address1(value: string) {
        this.#address1 = value;
    }

    get address2(): string | undefined {
        return this.#address2;
    }

    set address2(value: string) {
        this.#address2 = value;
    }

    get phone(): string | undefined {
        return this.#phone;
    }

    set phone(value: string) {
        this.#phone = value;
    }

    get description(): string | undefined {
        return this.#description;
    }

    set description(value: string) {
        this.#description = value;
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

    get entries():{[key:string]:unknown} {
        const copy = {...this.toJSON()};
        if (copy.id == null) {
            delete copy.id;
        }
        return copy;
    }

    get values():unknown[] {
        const result = [
            this.id,
            this.applicantId,
            this.title,
            this.company?.name,
            this.startDate,
            this.endDate,
            this.reasonForLeaving,
            this.company?.phone,
            this.company?.address1,
            this.company?.address2 ?? "",
            this.location?.city,
            this.location?.state,
            this.location?.country,
            this.description,
        ];
        if (this.id === undefined) result.shift();
        return result;
    }

    toJSON(): {[key:string]:unknown} {
        return {
            id: this.id,
            applicantId: this.#applicantId,
            title: this.title,
            startDate: this.startDate,
            endDate: this.endDate,
            reasonForLeaving: this.reasonForLeaving,
            company: this.company,
            location: this.location,
            description: this.description,
        };
    }
}