import type {Entity} from "./Entity.js";

export default class Position implements Entity {
    #id: number;
    #title: string;

    constructor(id: number, title: string) {
        this.#id = id;
        this.#title = title;
    }


    get id(): number {
        return this.#id;
    }

    get title(): string {
        return this.#title;
    }

    toJSON(): unknown {
        return {
            id: this.id,
            title: this.title,
        }
    }
}