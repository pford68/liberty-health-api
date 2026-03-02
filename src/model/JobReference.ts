import {isEmail, isPhone, isString} from "../util/validations.js";
import type {Entity, NamedQueries} from "./Entity.js";

type ReferenceQueries = NamedQueries & {
    byApplicantId: string,
    saveAll: string,
    update: string,
}

export interface ReferenceData {
    id?: number | undefined,
    applicantId: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    phone?: string,
    supervisor?: boolean
}

export default class JobReference implements Entity {
    #data: ReferenceData;

    static #table: string = "job_references";
    static #alias: string = "jr";
    static #columns = {
        id: "ref_id",
        applicant_fk: "applicant_id",
        firstName: "first_name",
        lastName: "last_name",
        email: "email",
        phone: "phone",
    }
    static #queries: ReferenceQueries = {
        byId: `SELECT * FROM ${JobReference.#table} WHERE ref_id = ?`,
        byApplicantId: `SELECT * FROM ${JobReference.#table} WHERE applicant_id = ?`,
        all: "",
        deleteOne: `DELETE FROM ${JobReference.#table} WHERE ref_id = ?`,
        save: [
            `INSERT INTO ${JobReference.#table}`,
            "VALUES(:applicantId, :first_name, :last_name, :email, :phone)"
        ].join(" "),
        saveAll: "",
        update: "",
    }

    static get namedPlaceholders(): string[] {
        return Object.entries(JobReference.columns).map((k, v) => {
            return `${v} = :${k}`;
        });
    }

    static get table(): string {
        return this.#table;
    }

    static get alias(): string {
        return this.#alias;
    }

    static get columns(): {
        id: string;
        applicant_fk: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string
    } {
        return this.#columns;
    }

    static get queries(): ReferenceQueries {
        return this.#queries;
    }

    static transform(row:{[key:string]:any}):JobReference {
        return new JobReference({
            id: row["ref_id"],
            firstName: row["first_name"],
            lastName: row["last_name"],
            email: row["email"],
            phone: row["phone"],
            applicantId: row["applicant_id"],
        })
    }

    static {
        const newRecord = Object.values(JobReference.#columns);
        const id = newRecord.shift();
        const table = JobReference.#table;

        JobReference.#queries = {
            ...JobReference.queries,
            saveAll: `INSERT INTO ${table} (${newRecord}) VALUES ?`,
        }
    }

    constructor(data: ReferenceData) {
        this.#data = data;
    }

    get data(): ReferenceData {
        return structuredClone(this.#data);
    }

    get id(): number | undefined {
        return this.#data.id;
    }

    get applicantId(): number | undefined {
        return this.#data.applicantId;
    }

    get firstName(): string {
        return this.#data.firstName ?? "";
    }

    get lastName(): string {
        return this.#data.lastName ?? "";
    }

    get email(): string {
        return this.#data.email ?? "";
    }

    get phone(): string {
        return this.#data.phone ?? "";
    }


    get entries():{[key:string]:unknown} {
        const copy = {...this.toJSON()};
        if (copy.id == null) {
            delete copy.id;
        }
        return copy;
    }

    get values():unknown[] {
        const values = [
            this.id,
            this.applicantId,
            this.firstName,
            this.lastName,
            this.email,
            this.phone,
        ];
        if (values[0] === undefined) values.shift();
        return values;
    }

    validate(): boolean {
        const validations = [
            () => isString(this.firstName),
            () => isString(this.lastName),
            () => isEmail(this.email),
            () => isPhone(this.phone),
        ];
        for (let validation of validations) {
            if (!validation()) return false;
        }
        return true;
    }

    toJSON(): ReferenceData {
        return this.data;
    }

    toString(): string {
        return JSON.stringify(this.data);
    }

}