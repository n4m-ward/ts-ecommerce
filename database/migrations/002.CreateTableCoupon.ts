import MigrationInterface from "../MigrationInterface";
import Connection from "../../src/Infra/Database/Connection";

export default class CreateTableItem001 implements MigrationInterface {

    constructor(readonly connection: Connection) {

    }

    async up(): Promise<void> {
        await this.connection.query(
            `
                create table coupon
                (
                    code        text,
                    percentage  numeric,
                    expire_date timestamp,
                    primary key (code)
                );`,
            {}
        )
    }

    async down(): Promise<void> {
        await this.connection.query("drop table if exists coupon")
    }
}
