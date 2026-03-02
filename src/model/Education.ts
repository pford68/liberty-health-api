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

export type EducationData = {
    id: number,
    applicantId: number,
    schoolName: string,
    location: Location,
    degree: Degree,
}


export default class Education implements Entity {
    #data: Partial<EducationData>;

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
        Education.#queries = {
            ...Education.#queries,
            byId:`SELECT * FROM ${table} WHERE ${id} = ?`,
            byApplicantId:`SELECT * FROM ${table} WHERE applicant_id = ?`,
            saveAll: `INSERT INTO ${table} (${newRecord}) VALUES ?`,
            deleteOne: `DELETE FROM ${table} WHERE ${id} = ?`,
        };
    }

    static transform(row:{[key:string]:any}):Education {
        return new Education({
            id: row["school_id"],
            applicantId: row["applicant_id"],
            schoolName: row["school_name"],
            degree: {id: row.degree_id, name:row.value},
            location: {city: row.city, state: row.state, country: row.country}
        })
    }

    constructor(data: Partial<EducationData>) {
        this.#data = data;
    }

    get id(): number | undefined {
        return this.#data.id;
    }

    get applicantId(): number | undefined {
        return this.#data.applicantId;
    }

    get schoolName(): string {
        return this.#data.schoolName ?? "";
    }

    get degree(): Degree | undefined {
        return this.#data.degree;
    }

    get location(): Location | undefined {
        return this.#data.location;
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

    get data(): Partial<EducationData> {
        return structuredClone(this.#data);
    }

    toJSON(): {[key:string]:unknown} {
        return this.data;
    }

    toString(): string {
        return JSON.stringify(this.data);
    }
}