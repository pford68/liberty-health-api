import dotenv from "dotenv";
import mysql  from 'mysql2/promise';

dotenv.config();
const db_type = process.env["LIBERTY_DB_TYPE"];

interface ConnectionParams {
    host: string
    user: string
    password: string
    database: string
}


class AbstractConnection {
    constructor() {
    }

    execute(preparedStatement:string, values:Array<unknown>){

    }
}

class MySQLConnection extends AbstractConnection {
    #options:ConnectionParams

    constructor(options:ConnectionParams) {
        super();
        this.#options = options;
    }

    async execute(preparedStatement:string, values:Array<unknown>) {
        const conn = await mysql.createConnection(this.#options);
        try {
            //@ts-ignore
            const [results, fields] = await conn.execute(preparedStatement, values);
        } catch (e) {
            console.log("Error creating mysql connection.")
        }
    }
}

class PostgresConnection extends AbstractConnection {

}

function connectionFactory() {
    const opts = {
        host: process.env.LIBERTY_HOST,
        database: process.env.LIBERTY_DB,
        user: process.env.LIBERTY_USER,
        password: process.env.LIBERTY_PWD
    }

    switch(db_type) {
        case "mysql":
            // @ts-ignore
            return new MySQLConnection(opts);
        case "postgres":
            return new PostgresConnection();
        default:
            throw new Error("DB type not found.  Check the LIBERTY_DB_TYPE env variable.")
    }
}

export default connectionFactory();