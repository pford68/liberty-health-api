export type EntityType<T> = {
    id?: string,
    columns: {[key:string]: string},
    table: string,
    alias: string,
    namedParameters?: string[],
    transform?: (row: {[k:string]:any}) => T
}

export interface Entity {
    toJSON(): unknown;
}

export type NamedQueries = {
    byId: string,
    all: string,
    deleteOne: string,
    save: string,
}

