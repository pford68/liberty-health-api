import type {Entity, NamedQueries} from "./Entity.js";

export interface UserData {
    id: number | undefined;
    firstName: string;
    lastName: string;
    userName: string;
    password?: string;
    email: string;
    authenticated: boolean,
    admin?: boolean
}

export default class User implements Entity {
    #data: Partial<UserData>;
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
        save: ""
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
        return new User({
            id: row["user_id"],
            userName: row["user_name"],
            email: row["email"],
            admin: row["admin"]
        })
    }

    constructor(data: Partial<UserData>) {
        this.#data = data;
        this.#data.authenticated = data.id != null;
    }

    get admin(): boolean {
        return this.#data.admin ?? false;
    }

    get id(): number | undefined {
        return this.#data.id;
    }

    get authenticated(): boolean {
        return this.#data.authenticated ?? false;
    }

    get email(): string {
        return this.#data.email ?? "";
    }


    get userName(): string {
        return this.#data.userName ?? "";
    }


    get data(): Partial<UserData> {
        return structuredClone(this.#data);
    }

    toJSON(): unknown {
        return this.data;
    }

    toString(): string {
        return JSON.stringify(this.data);
    }
}
