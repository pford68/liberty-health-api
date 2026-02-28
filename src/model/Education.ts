import type {Location} from "./Location.js";
import type {Entity, NamedQueries} from "./Entity.js";

type Degree = {
    id: number,
    name: string,
}

type EducationQueries = NamedQueries & {
    byApplicantId: string,
    saveAll: string,
    update: string,
}

export type EducationPayload = {
    id: number,
    applicantId: number,
    schoolName: string,
    location: Location,
    degree: Degree,
}


export default class Education implements Entity {
    #id: number;
    #applicantId: number;
    #schoolName: string;
    #degree: Degree;
    #location: Location;

    static #table:string = "education"
    static #columns:{[key:string]: string} = {
        id: "school_id",
        applicantId: "applicant_id",
        schoolName: "school_name",
        city: "city",
        state: "state",
        country: "country",
        degree: "degree_id",
    }
    static #queries:EducationQueries = {
        byId:"",
        byApplicantId: "",
        save: "",
        deleteOne: "",
        all: "",
        saveAll: "",
        update: "",
    };

    static get namedPlaceholders(): string[] {
        return Object.entries(Education.columns).map((k, v) => {
            return `${v} = :${k}`;
        });
    }

    static get table(): string {
        return this.#table;
    }

    static get columns(): { [p: string]: string } {
        return this.#columns;
    }

    static get queries(): EducationQueries {
        return this.#queries;
    }


    static {
        const newRecord = Object.values(Education.#columns);
        const id = newRecord.shift();
        const table = Education.#table;
        const placeholders = Education.namedPlaceholders;
        Education.#queries = {
            ...Education.#queries,
            byId:`SELECT * FROM ${table} WHERE ${id} = ?`,
            byApplicantId:`SELECT * FROM ${table} WHERE applicant_id = ?`,
            saveAll: `INSERT INTO ${table} (${newRecord}) VALUES ?`,
            deleteOne: `DELETE FROM ${table} WHERE ${id} = ?`,
            update: `UPDATE ${table} SET ${placeholders.join(",")} WHERE ${id} = ?`
        };
    }

    static transform(row:{[key:string]:any}):Education {
        return new Education(
            row["school_id"],
            row["applicant_id"],
            row["school_name"],
            {id: row.degree_id, name:row.value},
            {city: row.city, state: row.state, country: row.country}
        )
    }

    static create(data: EducationPayload):Education {
        return new Education(
            data.id,
            data.applicantId,
            data.schoolName,
            data.degree,
            data.location
        )
    }



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

    get entries():{[key:string]:unknown} {
        const copy = {...this.toJSON()};
        if (copy.id == null) {
            delete copy.id;
        }
        return copy;
    }

    get values():unknown[] {
        const values = [
            this.id,
            this.applicantId,
            this.schoolName,
            this.location?.city ?? "",
            this.location?.state ?? "",
            this.location?.country ?? "",
            this.degree?.id,
        ];
        if (values[0] === undefined) values.shift();
        return values;
    }

    toJSON(): {[key:string]:unknown} {
        return {
            id: this.id,
            applicantId: this.applicantId,
            schoolName: this.schoolName,
            degree: this.degree,
            location: this.location
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
}