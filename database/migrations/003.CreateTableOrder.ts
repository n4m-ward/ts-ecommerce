import MigrationInterface from "../MigrationInterface";
import Connection from "../../src/Infra/Database/Connection";

export default class CreateTableOrder implements MigrationInterface {

    constructor(readonly connection: Connection) {

    }

    async up(): Promise<void> {
        await this.connection.query(
            `
                create table "order"
                (
                    id_order          serial,
                    coupon_code       text,
                    coupon_percentage numeric,
                    code              text,
                    cpf               text,
                    issue_date        timestamp,
                    freight           numeric,
                    sequence          integer,
                    total             numeric,
                    primary key (id_order)
                );`,
            {}
        )
    }

    async down(): Promise<void> {
        await this.connection.query('drop table if exists "order"')
    }
}
