import MigrationInterface from "../MigrationInterface";
import Connection from "../../src/Infra/Database/Connection";

export default class CreateTableItem implements MigrationInterface {

    constructor(readonly connection: Connection) {

    }

    async up(): Promise<void> {
        await this.connection.query(
            `
                    create table item (
                    id_item SERIAL PRIMARY KEY,
                    description VARCHAR(100) NOT NULL,
                    price VARCHAR(50) NOT NULL
                )`,
            {}
        )
        await this.connection.close();
    }

    async down(): Promise<void> {
        await this.connection.query("drop table if exists item");
        await this.connection.close();
    }
}
