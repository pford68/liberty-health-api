import type {Location} from "./Location.js";
import type {Entity} from "./Entity.js";

type Degree = {
    id: number,
    name: string,
}

export default class Education implements Entity {
    #id: number;
    #applicantId: number;
    #schoolName: string;
    #degree: Degree;
    #location: Location;


    constructor(
        id: number,
        applicantId: number,
        schoolName: string,
        degree: Degree,
        location: Location
    ) {
        this.#id = id;
        this.#applicantId = applicantId;
        this.#schoolName = schoolName;
        this.#degree = degree;
        this.#location = location;
    }


    get id(): number {
        return this.#id;
    }

    get applicantId(): number {
        return this.#applicantId;
    }

    get schoolName(): string {
        return this.#schoolName;
    }

    get degree(): Degree {
        return this.#degree;
    }

    get location(): Location {
        return this.#location;
    }

    toJSON(): unknown {
        return {
            id: this.id,
            applicantId: this.applicantId,
            schoolName: this.schoolName,
            degree: this.degree,
            location: this.location
        };
    }
}