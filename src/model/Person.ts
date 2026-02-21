export default class Person {
    #firstName: string
    #lastName: string
    #email: string

    constructor(
        firstName: string,
        lastName: string,
        email: string,
    ) {
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#email = email;
    }

    get firstName(): string {
        return this.#firstName;
    }

    get lastName(): string {
        return this.#lastName;
    }

    get email(): string {
        return this.#email;
    }
}