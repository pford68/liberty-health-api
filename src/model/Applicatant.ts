import {isEmail, isString} from "../util/validations.js";
import Job from "./Job.js";
import JobReference from "./JobReference.js";
import License from "./License.js";
import type {NamedQueries} from "./Entity.js";
import  Education from "./Education.js";


export type ApplicationData = {
    id: number,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    position: Partial<Position>,
    status: Partial<Status>,
    eligibleToWork: boolean,
    jobHistory: Partial<Job>[],
    education: Partial<Education>[],
    references: Partial<JobReference>[],
    licenses: Partial<License>[],
    convictions: boolean,
}

type ApplicantQueries = NamedQueries & {
    byEmail: string,
}

type Position = {
    id: number,
    title: string,
}

type Status = {
    id: number,
    value: string,
}


export default class Applicant {
    #data: Partial<ApplicationData>;
    static #table: string = "applicants a";
    static #columns: {[key:string]: string} = {
        id: "applicant_id",
        firstName: "first_name",
        lastName: "last_name",
        position: "position_id",
        status: "status_id",
        email: "email",
        phone: "phone",
        eligibleToWork: "eligible_to_work",
        conviction: "has_convictions"
    };
    static #alias: string = "a";
    static #queries: ApplicantQueries = {
        byEmail: [
                "SELECT a.*,",
                "p.position_id, p.title as position, s.status_id, s.value as status",
                "FROM applicants a",
                "LEFT JOIN positions p",
                "USING(position_id)",
                "LEFT JOIN status s",
                "ON a.status_id = s.status_id",
                "WHERE a.email = ?",
            ].join(" "),
        save: [
                "INSERT INTO applicants",
                "(first_name, last_name, position_id, status_id, email, phone, eligible_to_work, has_convictions)",
                "VALUES (:firstName, :lastName, :position, :status, :email, :phone, :eligibleToWork, :convictions)",
            ].join(" "),
        deleteOne: "",
        byId: "",
        all: "",
    }


    constructor(data: Partial<ApplicationData>) {
        if (data.position?.id === undefined) {
            throw new Error("Missing position id");
        }
        if (data.status?.id === undefined) {
            throw new Error("Missing status id");
        }
        this.#data = data;
        this.#data.position = {...data.position};
        this.#data.status = {...data.status};
    }


    static get queries(): ApplicantQueries {
        return this.#queries;
    }

    static get table(): string {
        return Applicant.#table;
    }

    static get columns(): { [p: string]: string } {
        return Applicant.#columns;
    }

    static get alias(): string {
        return this.#alias;
    }

    static get namedParameters(): string[] {
        return Object.entries(Applicant.columns).map(([k, v]) => {
            return `${v} = :${k}`;
        })
    }

    get id(): number | undefined {
        return this.#data.id;
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

    get phome(): string {
        return this.#data.phone ?? "";
    }

    get status(): Partial<Status> {
        return this.#data.status ?? {};
    }

    get references(): Partial<JobReference>[] {
        return this.#data.references ?? [];
    }

    get position(): Partial<Position> {
        return this.#data.position ?? {};
    }

    get jobHistory(): Partial<Job>[] {
        return this.#data.jobHistory ?? [];
    }

    get education(): Partial<Education>[] {
        return this.#data.education ?? [];
    }

    get eligibleToWork(): boolean {
        return this.#data.eligibleToWork ?? false;
    }

    get licences(): Partial<License>[] {
        return this.#data.licenses ?? [];
    }

    get convictions(): boolean {
        return this.#data.convictions ?? false;
    }

    get data(): Partial<ApplicationData> {
        return structuredClone(this.#data);
    }

    get namedParameters(): string[] {
        return Object.entries(Applicant.columns).map((k, v) => {
            return `${v} = :${k}`;
        });
    }


    validate(): boolean {
        const validations = [
            () => isString(this.firstName),
            () => isString(this.lastName),
            () => this.position != undefined,
            () => isEmail(this.email),
            () => this.references.length >= 2,
            //() => this.#validateReferences(),
        ];
        for (let validation of validations) {
            if (!validation()) return false;
        }
        return true;
    }

    toJSON(): unknown {
        return this.data;
    }

    toString(): string {
        return JSON.stringify(this.data);
    }
}