import Person from "./Person.js";

export interface UserUpdate {
    firstName?: string;
    lastName?: string;
    password?: string;
    email?: string;
    authenticated?: boolean;
}

export default class User extends Person {
    #id: number
    #authenticated: boolean

    constructor(
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        authenticated: boolean
    ) {
        super(firstName, lastName, email);
        this.#id = id;
        this.#authenticated = authenticated;
    }

    get id(): number {
        return this.#id;
    }

    get authenticated(): boolean {
        return this.#authenticated;
    }

    update(args: UserUpdate): void {
        // Validate properties
        // Update properties
    }
}