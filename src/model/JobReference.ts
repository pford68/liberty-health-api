import Person from "./Person.js";
import {isEmail, isPhone, isString} from "../util/validations.js";
import type {Entity, NamedQueries} from "./Entity.js";

type ReferenceQueries = NamedQueries & {
    byApplicantId: string,
    saveAll: string,
    update: string,
}

export interface ReferencePayload {
    id: number | null,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    applicantId: number,
    supervisor?: boolean
}

export default class JobReference extends Person implements Entity {
    #id: number | null;
    #applicantId: number;

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

    static create(data: ReferencePayload): JobReference {
        return new JobReference(
            data.id,
            data.firstName,
            data.lastName,
            data.email,
            data.phone,
            data.applicantId
        )
    }

    static transform(row:{[key:string]:any}):JobReference {
        return new JobReference(
            row["ref_id"],
            row["first_name"],
            row["last_name"],
            row["email"],
            row["phone"],
            row["applicant_id"],
        )
    }

    static {
        const newRecord = Object.values(JobReference.#columns);
        const id = newRecord.shift();
        const table = JobReference.#table;
        const placeholders = JobReference.namedPlaceholders;

        JobReference.#queries = {
            ...JobReference.queries,
            update: `UPDATE ${table} SET ${placeholders.join(",")} WHERE ${id} = ?`,
            saveAll: `INSERT INTO ${table} (${newRecord}) VALUES ?`,
        }
    }

    constructor(
        id: number | null,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        applicantId: number,
    ) {
        super(firstName, lastName, email, phone);
        this.#id = id;
        this.#applicantId = applicantId;
    }


    get id(): number | null {
        return this.#id;
    }

    get applicantId(): number {
        return this.#applicantId;
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

    toJSON(): {[key:string]:unknown} {
        return {
            id: this.id,
            applicantId: this.applicantId,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone,
        }
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

}