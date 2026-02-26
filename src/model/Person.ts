export default class Person {
    #firstName: string
    #lastName: string
    #email: string
    #phone: string

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        phone: string
    ) {
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#email = email;
        this.#phone = phone;
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

    get phone(): string {
        return this.#phone;
    }
}