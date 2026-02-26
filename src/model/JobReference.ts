import Person from "./Person.js";
import {isEmail, isPhone, isString} from "../util/validations.js";
import type {Entity} from "./Entity.js";

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
        phone: "phone"
    }

    /*
    static create(data: ReferencePayload): JobReference {

    }*/

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
        }
    }

}