export interface UserUpdate {
    firstName?: string;
    lastName?: string;
    password?: string;
    email?: string;
    authenticated?: boolean,
    admin?: boolean
}

export default class User {
    #id: number
    #userName: string
    #email: string
    #authenticated: boolean
    #admin: boolean

    constructor(
        id: number,
        userName: string,
        email: string,
        admin: number
    ) {
        this.#id = id;
        this.#userName = userName;
        this.#email = email;
        this.#authenticated = id != null;
        this.#admin = admin === 1;
    }

    get admin(): boolean {
        return this.#admin;
    }

    get id(): number {
        return this.#id;
    }

    get authenticated(): boolean {
        return this.#authenticated;
    }

    get email(): string {
        return this.#email;
    }


    get userName(): string {
        return this.#userName;
    }

    update(args: UserUpdate): void {
        // Validate properties
        // Update properties
    }

    toJSON(): unknown {
        return {
            "id": this.id,
            "userName": `${this.userName}`,
            "email": `${this.email}`,
            "authenticated": this.authenticated,
            "admin": this.admin,
        }
    }
}
