import type {Entity, NamedQueries} from "./Entity.js";

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

export default class License implements Entity{
    #licenseNumber: string;
    #applicantId: number;
    #licenseType: LicenseType;
    #expiryDate: string | undefined;
    #issuingState: string | undefined;

    static #table:string = "applicant_licenses";
    static #alias:string = "lc";
    static #columns: {[key:string]: string} = {
        applicantId: "applicant_id",
        licenseType: "license_type_id",
        expiryDate: "date_expires",
        issuingState: "state_issued"
    };
    static #queries: NamedQueries = {
        byId: [
                "SELECT a.applicant_id, t.license_id, t.value as license, a.date_expires, a.state_issued",
                "FROM applicant_licenses a" ,
                "LEFT JOIN license_types t",
                "ON a.license_type_id = t.license_id",
                "WHERE applicant_id = ?"
            ].join(" "),
        all: "SELECT 1",
        deleteOne: "DELETE from applicant_licenses WHERE applicant_id = ?",
        save: [
                "INSERT INTO applicant_licenses " +
                "VALUES(:applicant_id, :license_type_id, :date_expires, :state_issued)"
            ].join(" ")
    }



    constructor(
        licenseNumber: string,
        applicantId: number,
        licenseType: LicenseType,
        expiryDate: string | undefined = undefined,
        issuingState: string | undefined = undefined
    ) {
        this.#licenseNumber = licenseNumber
        this.#applicantId = applicantId;
        this.#licenseType = licenseType;
        this.#expiryDate = expiryDate;
        this.#issuingState = issuingState;
    }


    static get columns(): { [p: string]: string } {
        return this.#columns;
    }

    static get queries(): NamedQueries {
        return this.#queries;
    }

    static get table(): string {
        return this.#table;
    }


    static get namedParameters(): string[] {
        return Object.entries(License.columns).map(([k, v]) => {
            return `${v} = :${k}`;
        })
    }

    static get alias(): string {
        return this.#alias;
    }

    get licenseNumber(): string {
        return this.#licenseNumber;
    }

    get applicantId(): number {
        return this.#applicantId;
    }

    get licenseType(): LicenseType {
        return this.#licenseType;
    }

    get expiryDate(): string | undefined {
        return this.#expiryDate;
    }

    get issuingState(): string | undefined {
        return this.#issuingState;
    }

    toJSON():unknown {
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
}