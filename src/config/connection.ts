import dotenv from "dotenv";
import mysql, {type FieldPacket, type QueryResult, type RowDataPacket} from 'mysql2/promise';

dotenv.config();
const db_type = process.env["LIBERTY_DB_TYPE"];

interface ConnectionParams {
    host: string
    user: string
    password: string
    database: string
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


class AbstractConnection {
    constructor() {
    }

    execute(preparedStatement:string, values:unknown[]): Promise<unknown>{
        return new Promise((resolve, reject) => {
            resolve([[], []]);
        })
    }
}

class MySQLConnection extends AbstractConnection {
    #options:ConnectionParams

    constructor(options:ConnectionParams) {
        super();
        this.#options = options;
    }

    async execute(preparedStatement:string, values:Value[]):Promise<RowDataPacket | undefined> {
        const conn = await mysql.createConnection(this.#options);
        try {
            const [results] = await conn.execute<RowDataPacket[]>(preparedStatement, values);
            return results[0];
        } catch (e) {
            throw new Error("Error creating mysql connection.");
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
        password: process.env.LIBERTY_PWD ?? (() => onMissingProp("LIBERTY_PWD"))()
    }

    switch(db_type) {
        case "mysql":
            return new MySQLConnection(opts);
        case "postgres":
            return new PostgresConnection();
        default:
            throw new Error("DB type not found.  Check the LIBERTY_DB_TYPE env variable.")
    }
}

export default connectionFactory();