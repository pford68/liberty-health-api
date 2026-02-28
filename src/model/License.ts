import type {Entity, NamedQueries} from "./Entity.js";

export type LicensePayload = {
    licenseNumber: string,
    applicantId: number,
    licenseType: LicenseType,
    expiryDate: string,
    issuingState: string,
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
    #licenseNumber: string;
    #applicantId: number;
    #licenseType: Partial<LicenseType>;
    #expiryDate: string | undefined;
    #issuingState: string | undefined;

    static #table:string = "applicant_licenses";
    static #alias:string = "lc";
    static #columns: {[key:string]: string} = {
        applicantId: "applicant_id",
        licenseType: "license_type_id",
        licenseNumber: "license_number",
        expiryDate: "date_expires",
        issuingState: "state_issued"
    };
    static #queries: LicenseQueries = {
        byId: "",
        all: [
                "SELECT  a.applicant_id, t.license_id, t.value as license, a.license_number, a.date_expires, a.state_issued",
                "FROM applicant_licenses a" ,
                "LEFT JOIN license_types t",
                "ON a.license_type_id = t.license_id",
                "WHERE applicant_id = ?"
            ].join(" "),
        deleteOne: "DELETE from applicant_licenses WHERE applicant_id = ?",
        save: [
                "INSERT INTO applicant_licenses " +
                "VALUES(:applicant_id, :license_type_id, :license_number, :date_expires, :state_issued)"
            ].join(" "),
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

    static create(data: LicensePayload): License {
        return new License(
            data.applicantId,
            data.licenseType,
            data.licenseNumber,
            data.expiryDate,
            data.issuingState
        );
    }

    static transform(row:{[p:string]: any}): License {
        return new License(
            row["applicant_id"],
            {id: row["license_type_id"], name: row["license"]},
            row["license_number"],
            row["date_expires"],
            row["state_issued"],
        );
    }

    static {
        const record = Object.values(License.#columns);
        const id = record[0];
        const table = License.#table;
        const placeholders = License.namedPlaceholders;
        License.#queries = {
            ...License.#queries,
            byId:`SELECT * FROM ${table} WHERE ${id} = ?`,
            saveAll: `INSERT INTO ${table} (${record}) VALUES ?`,
            deleteOne: `DELETE FROM ${table} WHERE ${id} = ?`,
            update: `UPDATE ${table} SET ${placeholders.join(",")} WHERE ${id} = ?`
        };
    }



    constructor(
        applicantId: number,
        licenseType: Partial<LicenseType>,
        licenseNumber: string,
        expiryDate: string | undefined = undefined,
        issuingState: string | undefined = undefined
    ) {
        this.#licenseNumber = licenseNumber
        this.#applicantId = applicantId;
        this.#licenseType = licenseType;
        this.#expiryDate = expiryDate;
        this.#issuingState = issuingState;
    }


    get licenseNumber(): string {
        return this.#licenseNumber;
    }

    get applicantId(): number {
        return this.#applicantId;
    }

    get licenseType(): Partial<LicenseType> {
        return this.#licenseType;
    }

    get expiryDate(): string | undefined {
        return this.#expiryDate;
    }

    get issuingState(): string | undefined {
        return this.#issuingState;
    }

    toJSON():{[key:string]:unknown} {
        return {
            applicantId: this.applicantId,
            licenseType: this.licenseType,
            licenseNumber: this.licenseNumber,
            expiryDate: this.expiryDate,
            issuingState: this.issuingState,
        }
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }

    get values(): unknown[] {
        return Object.entries(this.toJSON()).map(([k, v]) => {
            if (v == null) return "";
            if (k == "licenseType") return (v as LicenseType).id;
            return v;
        })
    }

    get entries():{[key:string]:unknown} {
        return {...this.toJSON()};
    }
}