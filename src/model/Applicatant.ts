import Person from "./Person.js";
import {isEmail, isPhone, isString} from "../util/validations.js";



export interface Location {

}

export interface Company {
    
}

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
}

export class JobReference extends Person {
    #phone: string

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        phone: string
    ) {
        super(firstName, lastName, email);
        this.#phone = phone;
    }

    get phone(): string {
        return this.#phone;
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
}

class Job {
    #title: string
    #startDate?: Date
    #endDate?: Date
    #reasonForLeaving?: string
    #supervisor?: JobReference
    #company?: Company
    #location?: Location

    constructor(
        title: string
    ) {
        this.#title = title;
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
}


export default class Applicant extends Person {
    #references: Array<JobReference>
    #position: Position
    #jobHistory: Array<Job>


    constructor(
        firstName: string,
        lastName: string,
        email: string,
        position: Position,
    ) {
        super(firstName, lastName, email);
        this.#references = [];
        this.#position = position;
        this.#jobHistory = [];
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
}