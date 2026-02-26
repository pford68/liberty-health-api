import type {EntityType} from "../model/Entity.js";

export default class QueryBuilder {
    #query: string[];

    constructor() {
        this.#query = [];
    }

    build(): string {
        return this.#query.join(" ");
    }

    append(value: string): QueryBuilder {
        this.#query.push(value);
        return this;
    }

    select<T>(cls:EntityType<T>, ...selectedCols:string[]): QueryBuilder {
        const stmt = ["SELECT"];
        if (selectedCols.length > 0 && selectedCols[0] != "*") {
            stmt.push("(");
            const cols = selectedCols.map((col) => {
                return `${cls.alias}.${col}`;
            });
            stmt.push(...cols);
            stmt.push(")");
        } else {
            stmt.push("*")
        }
        this.#query.push(stmt.join(" "));
        return this;
    }

    columns<T>(cls:EntityType<T>, ...selectedCols:String[]): QueryBuilder {
        let cols = ["*"];
        if (selectedCols.length > 0) {
            cols = Object.values(cls.columns)
                .filter((v: string) => {
                    return selectedCols.includes(v);
                })
                .map((v: string) => {
                    return `${cls.alias}.${v}`;
                });
        }
        this.#query.push(cols.join(","));
        return this;
    }

    from<T>(cls: EntityType<T>): QueryBuilder {
        this.#query.push(`FRON ${cls.table} ${cls.alias}`);
        return this;
    }

    join<T>(cls:EntityType<T>): QueryBuilder {
        this.#query.push(`JOIN ${cls.table} ${cls.alias}`);
        return this;
    }

    leftJoin<T>(cls:EntityType<T>): QueryBuilder {
        this.#query.push(`LEFT JOIN ${cls.table} ${cls.alias}`);
        return this;
    }

    where(criteria: string): QueryBuilder {
        this.#query.push(`WHERE ${criteria}`);
        return this;
    }

    orderBy(cols: string[], desc = false):QueryBuilder {
        const dir = desc ? ` DESC` : ""
        this.#query.push(`ORDER BY ${cols.join(",")}${dir}`);
        return this;
    }

    limit(num: number):QueryBuilder {
        this.#query.push(`LIMIT ${num}`)
        return this;
    }

    offset(num: number):QueryBuilder {
        this.#query.push(`OFFSET ${num}`)
        return this;
    }

    insert<T>(cls: EntityType<T>, cols:string[], values:unknown[]): QueryBuilder {
        const stmt = [`INSERT INTO ${cls.table}`];
        if (cols.length > 0) {
            stmt.push(`(${cols.join(",")})`)
        }
        stmt.push(`VALUES(${values.join(",")})`)
        this.#query.push(stmt.join(" "));
        return this;
    }

    update<T>(cls: EntityType<T>, cols:string[], criteria:string): QueryBuilder {
        const stmt = [`SET ${cls.table}`];
        if (cols.length > 0) {
            const substr = Object.entries(cls.columns).map(([k, v]) => {
                return `${v} = :${k}`;
            });
            stmt.push(...substr);
        }
        stmt.push(`WHERE ${criteria}`);
        this.#query.push(stmt.join(" "));
        return this;
    }
}