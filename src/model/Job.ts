import {isString} from "../util/validations.js";
import type {Location} from "./Location.js";
import type {Entity, NamedQueries} from "./Entity.js";

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


export interface JobData {
    id: number | undefined;
    applicantId: number;
    title: string;
    startDate: Date;
    endDate?: Date;
    address1: string;
    address2: string;
    phone: string;
    reasonForLeaving: string;
    company: Company;
    location: Location;
    description: string;
}

export default class Job implements Entity {
    #data: Partial<JobData>;
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
        Job.#queries = {
            ...Job.#queries,
            byId:`SELECT * FROM ${table} WHERE ${id} = ?`,
            byApplicantId:`SELECT * FROM ${table} WHERE applicant_id = ?`,
            saveAll: `INSERT INTO ${table} (${newRecord}) VALUES ?`,
            deleteOne: `DELETE FROM ${table} WHERE ${id} = ?`,
        };
    }


    static transform(row:{[p:string]: any}): Job {
        const data = {
            id: row.id,
            title: row.title,
            applicantId: row["applicant_id"],
            company: {
                name: row.company,
                phone: row.phone,
                address1: row.address1,
                address2: row.address2,
                startDate: row["start_date"],
                endDate: row["end_date"],
                reasonForLeaving: row["reason_ended"],
                location: {
                    city: row.city,
                    state: row.state,
                    country: row.country
                }
            }
        };
        return new Job(data);
    }

    constructor(data: Partial<JobData>) {
        this.#data = data;
    }

    get id(): number | undefined {
        return this.#data.id;
    }

    get applicantId(): number | undefined{
        return this.#data.applicantId;
    }

    get startDate(): Date | undefined {
        return this.#data.startDate;
    }

    get endDate(): Date | undefined {
        return this.#data.endDate;
    }

    get reasonForLeaving(): string | undefined {
        return this.#data.reasonForLeaving;
    }

    get company(): Company | undefined {
        return this.#data.company;
    }

    get location(): Location | undefined {
        return this.#data.location;
    }

    get title(): string | undefined {
        return this.#data.title;
    }

    get address1(): string | undefined {
        return this.#data.address1;
    }

    get address2(): string | undefined {
        return this.#data.address2;
    }

    get phone(): string | undefined {
        return this.#data.phone;
    }

    get description(): string | undefined {
        return this.#data.description;
    }

    get data(): Partial<JobData> {
        return structuredClone(this.#data);
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
            applicantId: this.applicantId,
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