import type {Entity} from "./Entity.js";

export default class Status implements Entity{
    #id: number;
    #value: string;

    constructor(id: number, value: string) {
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