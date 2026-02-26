import Person from "./Person.js";
import {isEmail, isString} from "../util/validations.js";
import Job from "./Job.js";
import JobReference from "./JobReference.js";
import Position from "./Position.js";
import Status from "./Status.js";
import License from "./License.js";

interface ApplicantPayload {
    id: number,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    position: Partial<Position>,
    status: Partial<Status>,
    eligibleToWork: boolean,
    licenses: Partial<License>[],
    convictions: boolean
}


export default class Applicant extends Person {
    #id: number | undefined;
    #references: JobReference[];
    #position: Partial<Position>;
    #jobHistory: Job[];
    #status: Partial<Status>;
    #eligibleToWork: boolean;
    #licences: Partial<License>[];
    #convictions: boolean = false;
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


    static create(data: ApplicantPayload): Applicant {
        if (data.position.id === undefined) {
            throw new Error("Missing position id");
        }
        if (data.status.id === undefined) {
            throw new Error("Missing status id");
        }
        return new Applicant(
            data.id,
            data.firstName,
            data.lastName,
            data.email,
            new Position(data.position.id, data.position.title ?? ""),
            new Status(data.status.id, data.status.value ?? ""),
            data.phone,
            data.eligibleToWork,
            data.licenses,
            data.convictions
        );
    }

    constructor(
        id: number | null,
        firstName: string,
        lastName: string,
        email: string,
        position: Partial<Position>,
        status: Partial<Status>,
        phone: string,
        eligibleToWork: boolean,
        licenses: Partial<License>[],
        convictions: boolean
    ) {
        super(firstName, lastName, email, phone);
        this.#id = id != null ? id : undefined;
        this.#references = [];
        this.#position = position;
        this.#jobHistory = [];
        this.#status = status;
        this.#eligibleToWork = eligibleToWork;
        this.#licences = licenses ?? [];
        this.#convictions = convictions ?? this.#convictions;
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
        return this.#id;
    }

    get status(): Partial<Status> {
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

    get position(): Partial<Position> {
        return this.#position;
    }

    set position(value: Partial<Position>) {
        this.#position = value;
    }

    get jobHistory(): Array<Job> {
        return this.#jobHistory;
    }

    set jobHistory(value: Array<Job>) {
        this.#jobHistory = value;
    }

    get eligibleToWork(): boolean {
        return this.#eligibleToWork;
    }

    get licences(): Partial<License>[] {
        return this.#licences;
    }

    get convictions(): boolean {
        return this.#convictions;
    }

    get namedParameters(): string[] {
        return Object.entries(Applicant.columns).map((k, v) => {
            return `${v} = :${k}`;
        });
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
            id: this.id ?? undefined,
            firstName: this.firstName,
            lastNme: this.lastName,
            email: this.email,
            position: this.position,
            references: this.references,
            employmentHistory: this.jobHistory,
        };
    }
}