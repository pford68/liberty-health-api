import type {Entity, NamedQueries} from "./Entity.js";

export interface UserUpdate {
    firstName?: string;
    lastName?: string;
    password?: string;
    email?: string;
    authenticated?: boolean,
    admin?: boolean
}

export default class User implements Entity {
    #id: number
    #userName: string
    #email: string
    #authenticated: boolean
    #admin: boolean
    static #table:string = "users";
    static #alias:string = "u";
    static #columns:{[k:string]: string} = {
        id: "user_id",
        userName: "user_name",
        email: "email",
        active: "active",
        admin: "admin",
        password: "password",
        createdDate: "data_creates",
        lastLogin: "last_login"
    }
    static #queries:NamedQueries = {
        byId:
            "SELECT user_id, user_name, email, admin FROM users " +
            "WHERE user_id = ? AND active = 1",
        all: "SELECT user_id, user_name, email, admin FROM users WHERE active = 1",
        deleteOne: "DELETE FROM users WHERE user_id = ?",
    }


    static get table(): string {
        return this.#table;
    }

    static get alias(): string {
        return this.#alias;
    }

    static get columns(): { [p: string]: string } {
        return this.#columns;
    }


    static get queries(): NamedQueries {
        return this.#queries;
    }

    static transform(row:{[k:string]:any}): User {
        return new User(
            row["user_id"],
            row["user_name"],
            row["email"],
            row["admin"]
        )
    }

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
