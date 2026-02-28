import Person from "./Person.js";
import {isEmail, isPhone, isString} from "../util/validations.js";
import type {Entity, NamedQueries} from "./Entity.js";

type ReferenceQueries = NamedQueries & {
    byApplicantId: string,
}

interface ReferencePayload {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    applicantId: number,
    supervisor?: boolean
}

export default class JobReference extends Person implements Entity {
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
    static queries: ReferenceQueries = {
        byId: "SELECT * FROM job_references WHERE ref_id = ?",
        byApplicantId: "SELECT * FROM job_references WHERE applicant_id = ?",
        all: "",
        deleteOne: "DELETE FROM job_references WHERE ref_id = ?",
        save: [
            "INSERT INTO job_references",
            "VALUES(:applicantId, :first_name, :last_name, :email, :phone)"
        ].join(" ")
    }


    static create(data: ReferencePayload): JobReference {
        return new JobReference(
            data.firstName,
            data.lastName,
            data.email,
            data.phone,
            data.applicantId
        )
    }

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        applicantId: number,
    ) {
        super(firstName, lastName, email, phone);
        this.#applicantId = applicantId;
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

    toJSON(): unknown {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone,
            applicantId: this.applicantId
        }
    }

}