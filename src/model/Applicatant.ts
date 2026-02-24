import Person from "./Person.js";
import {isEmail, isString} from "../util/validations.js";
import {Job} from "./Job.js";
import {JobReference} from "./JobReference.js";


export class Position {
    #id: number
    #title: string
    
    constructor(id:number, title:string) {
        this.#id = id;
        this.#title = title;
    }


    get id(): number {
        return this.#id;
    }

    get title(): string {
        return this.#title;
    }

    toJSON(): unknown {
        return {
            id: this.id,
            title: this.title,
        }
    }
}

export class Status {
    #id: number
    #value: string

    constructor(id:number, value:string) {
        this.#id = id;
        this.#value = value;
    }


    get id(): number {
        return this.#id;
    }

    get value(): string {
        return this.#value;
    }

    toJSON(): unknown {
        return {
            id: this.id,
            value: this.value,
        }
    }
}


export default class Applicant extends Person {
    #references: JobReference[]
    #position: Position
    #jobHistory: Job[]
    #status: Status


    constructor(
        firstName: string,
        lastName: string,
        email: string,
        position: Position,
        status: Status,
        phone: string
    ) {
        super(firstName, lastName, email, phone);
        this.#references = [];
        this.#position = position;
        this.#jobHistory = [];
        this.#status = status;
    }

    get status(): Status {
        return this.#status;
    }

    set status(value: Status) {
        this.#status = value;
    }

    get references(): Array<JobReference> {
        return this.#references;
    }

    set references(value: Array<JobReference>) {
        this.#references = value;
    }


    get position(): Position {
        return this.#position;
    }

    set position(value: Position) {
        this.#position = value;
    }


    get jobHistory(): Array<Job> {
        return this.#jobHistory;
    }

    set jobHistory(value: Array<Job>) {
        this.#jobHistory = value;
    }

    #validateReferences(): boolean {
        let errors = 0;
        this.references.forEach(ref => {
            if (!ref.validate()) ++errors;
        });
        return errors === 0;
    }

    validate(): boolean {
        const validations = [
            () => isString(this.firstName),
            () => isString(this.lastName),
            () => this.position != undefined,
            () => isEmail(this.email),
            () => this.references.length >= 2,
            () => this.#validateReferences(),
        ];
        for (let validation of validations) {
            if (!validation()) return false;
        }
        return true;
    }

    toJSON(): unknown {
        return {
            firstName: this.firstName,
            lastNme: this.lastName,
            email: this.email,
            position: this.position,
            references: this.references,
            employmentHistory: this.jobHistory,
        };
    }
}