import type {Entity} from "./Entity.js";

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
        }
    }
}