import Connection from "./Connection";
import pgp from "pg-promise";

export default class PgPromiseConnectionAdapter implements Connection {
    pgp: any;

    constructor() {
        this.pgp = pgp()("postgres://test:test@localhost:12345/test");
    }

    async query(statement: string, params: any = {}): Promise<any> {
        return await this.pgp.query(statement, params);
    }
}
