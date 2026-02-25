import dotenv from "dotenv";
import mysql, {type ResultSetHeader, type RowDataPacket} from 'mysql2/promise';

dotenv.config();
const dbType = process.env["LIBERTY_DB_TYPE"];

interface ConnectionParams {
    host: string
    user: string
    password: string
    database: string,
    namedPlaceholders: boolean
}

type Value =

    | string
    | number
    | boolean

    | symbol
    | bigint
    | null

    | Record<string, unknown> // Object
    | ({} | null)[]; // Array of values

interface SaveStatus {
    id: number,
    affectedRows: number
}


class AbstractConnection {
    constructor() {
    }

    execute(preparedStatement:string, values:Value[]): Promise<RowDataPacket[] | undefined>{
        return new Promise((resolve, reject) => {
            resolve(undefined);
        })
    }

    save(preparedStatement:string, values:{ [key: string]: any }): Promise<SaveStatus | undefined>{
        return new Promise((resolve, reject) => {
            resolve(undefined);
        })
    }
}

class MySQLConnection extends AbstractConnection {
    #options:ConnectionParams

    constructor(options:ConnectionParams) {
        super();
        this.#options = options;
    }

    async execute(preparedStatement:string, values:Value[]):Promise<RowDataPacket[] | undefined> {
        try {
            const conn = await mysql.createConnection(this.#options);
            const [results] = await conn.execute<RowDataPacket[]>(preparedStatement, values);
            return results;
        } catch (e) {
            throw new Error(`An error occurred while executing a query: ${(e as Error).message}`);
        }
    }

    async save(preparedStatement:string, values:{ [key: string]: any }):Promise<SaveStatus | undefined> {
        try {
            const conn = await mysql.createConnection(this.#options);
            const [header] = await conn.execute<ResultSetHeader>(preparedStatement, values);
            return {
                id: header.insertId,
                affectedRows: header.affectedRows,
            }
        } catch (e) {
            throw new Error(`An error occurred while saving records: ${(e as Error).message}`);
        }
    }
}

class PostgresConnection extends AbstractConnection {

}

function connectionFactory() {
    const onMissingProp = (p: string) => {
        throw new Error(`The env variable ${p} is missing.`);
    }
    const opts: ConnectionParams = {
        host: process.env.LIBERTY_HOST ?? (() => onMissingProp("LIBERTY_HOST"))(),
        database: process.env.LIBERTY_DB ?? (() => onMissingProp("LIBERTY_DB"))(),
        user: process.env.LIBERTY_USER ?? (() => onMissingProp("LIBERTY_USER"))(),
        password: process.env.LIBERTY_PWD ?? (() => onMissingProp("LIBERTY_PWD"))(),
        namedPlaceholders: true,
    }

    switch(dbType) {
        case "mysql":
            return new MySQLConnection(opts);
        case "postgres":
            return new PostgresConnection();
        default:
            throw new Error("DB type not found.  Check the LIBERTY_DB_TYPE env variable.")
    }
}

export default connectionFactory();