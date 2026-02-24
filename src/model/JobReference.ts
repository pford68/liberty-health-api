import Person from "./Person.js";
import {isEmail, isPhone, isString} from "../util/validations.js";

export class JobReference extends Person {

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        phone: string
    ) {
        super(firstName, lastName, email, phone);
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