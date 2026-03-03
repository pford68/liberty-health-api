import type {Entity, NamedQueries} from "./Entity.js";

export type LicenseData = {
    licenseNumber?: string,
    applicantId: number,
    licenseType?: Partial<LicenseType>,
    expiryDate?: string,
    issuingState?: string,
}

type LicenseQueries = NamedQueries & {
    saveAll: string,
    update: string,
}

export class LicenseType implements Entity {
    #id: number;
    #name: string;
    #table:string = "license_types";
    #columns: {[key:string]: string};

    constructor(id: number, name:string) {
        this.#id = id;
        this.#name = name;
        this.#columns = {
            id: "license_id",
            name: "value",
        }
    }


    get id(): number {
        return this.#id;
    }

    get name(): string {
        return this.#name;
    }


    get table(): string {
        return this.#table;
    }

    get columns(): { [p: string]: string } {
        return this.#columns;
    }

    toJSON(): unknown {
        return {
            id: this.id,
            name: this.name
        }
    }
}

export default class License implements Entity {
    #data: LicenseData;

    static #table:string = "applicant_licenses";
    static #alias:string = "lc";
    static #columns: {[key:string]: string} = {
        applicantId: "applicant_id",
        licenseNumber: "license_number",
        licenseType: "license_type_id",
        expiryDate: "date_expires",
        issuingState: "state_issued"
    };
    static #queries: LicenseQueries = {
        byId: "",
        all: [
                "SELECT  a.applicant_id, , a.license_number, t.license_id, t.value as license, a.date_expires, a.state_issued",
                "FROM applicant_licenses a" ,
                "LEFT JOIN license_types t",
                "ON a.license_type_id = t.license_id",
                "WHERE applicant_id = ?"
            ].join(" "),
        deleteOne: "DELETE from applicant_licenses WHERE applicant_id = ?",
        save: "",
        saveAll: "",
        update: "",
    }



    static get columns(): { [p: string]: string } {
        return this.#columns;
    }

    static get queries(): LicenseQueries {
        return this.#queries;
    }

    static get table(): string {
        return this.#table;
    }


    static get namedPlaceholders(): string[] {
        return Object.entries(License.columns).map(([k, v]) => {
            return `${v} = :${k}`;
        })
    }

    static get alias(): string {
        return this.#alias;
    }

    static transform(row:{[p:string]: any}): License {
        return new License({
            applicantId: row["applicant_id"],
            licenseNumber: row["license_number"],
            licenseType: {id: row["license_type_id"], name: row["license"]},
            expiryDate: row["date_expires"],
            issuingState: row["state_issued"],
        });
    }

    static {
        const record = Object.values(License.#columns);
        const id = record[0];
        const table = License.#table;
        License.#queries = {
            ...License.#queries,
            byId:`SELECT * FROM ${table} WHERE ${id} = ?`,
            save: [
                `INSERT INTO ${table} ` +
                "VALUES(:applicant_id, :license_type_id, :license_number, :date_expires, :state_issued)"
            ].join(" "),
            saveAll: `INSERT INTO ${table} (${record}) VALUES ?`,
            deleteOne: `DELETE FROM ${table} WHERE ${id} = ?`,
        };
    }



    constructor(data: LicenseData) {
        this.#data = data;
    }


    get licenseNumber(): string | undefined {
        return this.#data.licenseNumber;
    }

    get applicantId(): number {
        return this.#data.applicantId;
    }

    get licenseType(): Partial<LicenseType> | undefined {
        return this.#data.licenseType;
    }

    get expiryDate(): string | undefined {
        return this.#data.expiryDate;
    }

    get issuingState(): string | undefined {
        return this.#data.issuingState;
    }

    get data(): LicenseData {
        return structuredClone(this.#data);
    }

    toJSON():{[key:string]:unknown} {
        return this.data;
    }

    toString(): string {
        return JSON.stringify(this.data);
    }

    get values(): unknown[] {
        return Object.entries(this.data).map(([k, v]) => {
            if (v == null) return "";
            if (k == "licenseType") return (v as LicenseType).id;
            return v;
        })
    }

    get entries():{[key:string]:unknown} {
        return {...this.data};
    }
}