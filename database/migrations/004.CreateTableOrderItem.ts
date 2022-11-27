import MigrationInterface from "../MigrationInterface";
import Connection from "../../src/Infra/Database/Connection";

export default class CreateTableOrder implements MigrationInterface {

    constructor(readonly connection: Connection) {

    }

    async up(): Promise<void> {
        await this.connection.query(
            `
                create table order_item
                (
                    id_order integer,
                    id_item  integer,
                    price    numeric,
                    quantity integer,
                    primary key (id_order, id_item)
                );`,
            {}
        )
        await this.connection.close();
    }

    async down(): Promise<void> {
        await this.connection.query('drop table if exists order_item');
        await this.connection.close();
    }
}
