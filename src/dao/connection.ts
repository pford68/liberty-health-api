import dotenv from "dotenv";
import mysql, {type Pool, type PoolConnection, type ResultSetHeader, type RowDataPacket} from 'mysql2/promise';

dotenv.config();
const dbType = process.env["LIBERTY_DB_TYPE"];

interface ConnectionParams {
    host: string
    user: string
    password: string
    database: string,
    namedPlaceholders: boolean,
    waitForConnections: boolean,
    connectionLimit: number,
    queueLimit: number,
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

export interface SaveStatus {
    id: number,
    affectedRows: number
}


class AbstractConnection {
    constructor() {
    }

    execute(preparedStatement:string, values:Value[]): Promise<{[p:string]:any}[] | undefined>{
        return new Promise((resolve, reject) => {
            resolve(undefined);
        })
    }

    save(preparedStatement:string, values:{ [key: string]: any }): Promise<SaveStatus | undefined>{
        return new Promise((resolve, reject) => {
            resolve(undefined);
        })
    }

    saveAll(preparedStatement:string, values:{ [key: string]: any }[]): Promise<SaveStatus | undefined>{
        return new Promise((resolve, reject) => {
            resolve(undefined);
        })
    }
}




class MySQLConnection extends AbstractConnection {
    #options:ConnectionParams
    #pool: Pool;

    constructor(options:ConnectionParams) {
        super();
        this.#options = options;
        this.#pool = mysql.createPool(this.#options)
    }

    async execute(preparedStatement:string, values:Value[]):Promise<{[p:string]:any}[] | undefined> {
        let conn;
        try {
            conn = await this.#pool.getConnection();
            const [results] = await conn.execute<RowDataPacket[]>(preparedStatement, values);
            return results;
        } catch (e) {
            throw new Error(`An error occurred while executing a query: ${(e as Error).message}`);
        } finally {
            if (conn) conn.release();
        }
    }

    async save(preparedStatement:string, values:{ [key: string]: any }):Promise<SaveStatus | undefined> {
        let conn;
        try {
            conn = await this.#pool.getConnection();
            const [header] = await conn.execute<ResultSetHeader>(preparedStatement, values);
            return {
                id: header.insertId,
                affectedRows: header.affectedRows,
            }
        } catch (e) {
            throw new Error(`An error occurred while saving records: ${(e as Error).message}`);
        } finally {
            if (conn) conn.release();
        }
    }

    async saveAll(preparedStatement:string, values:{ [key: string]: any }[]):Promise<SaveStatus | undefined> {
        let conn;
        try {
            conn = await this.#pool.getConnection();
            conn.beginTransaction();
            const [rows] = await conn.query<ResultSetHeader>(preparedStatement, values);
            conn.commit();
            return {
                id: rows.insertId,
                affectedRows: rows.affectedRows,
            }
        } catch (e) {
            if (conn) {
                await conn.rollback();
                throw new Error(`An error occurred while saving records: ${(e as Error).message}`);
            }
        } finally {
            if (conn) {
                conn.release();
            }
        }
    }
}



class PostgresConnection extends AbstractConnection {

}

function connectionFactory() {
    const onMissingProp = (p: string) => {
        throw new Error(`The env variable ${p} is missing.`);
    }
    const {QUEUE_LIMIT, CONNECTION_LIMIT} = process.env;
    const opts: ConnectionParams = {
        host: process.env.LIBERTY_HOST ?? (() => onMissingProp("LIBERTY_HOST"))(),
        database: process.env.LIBERTY_DB ?? (() => onMissingProp("LIBERTY_DB"))(),
        user: process.env.LIBERTY_USER ?? (() => onMissingProp("LIBERTY_USER"))(),
        password: process.env.LIBERTY_PWD ?? (() => onMissingProp("LIBERTY_PWD"))(),
        namedPlaceholders: true,
        waitForConnections: true,
        connectionLimit: CONNECTION_LIMIT !== undefined ? Number(CONNECTION_LIMIT) : 10,
        queueLimit: QUEUE_LIMIT !== undefined ? Number(QUEUE_LIMIT) : 0,
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