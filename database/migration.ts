import MigrationInterface from "./MigrationInterface";
const fs = require('fs')
import PgPromiseConnectionAdapter from "../src/Infra/Database/PgPromiseConnectionAdapter";

(async () => {
    const upOrDownMethodName = getUpOrDownMethodName();
    const allMigrations = getListOfMigrations();

    for(let migrationName of allMigrations) {
        const migration: MigrationInterface = getMigrationByName(migrationName);
        await migration[upOrDownMethodName]();
    }
    console.log("OK!")
})()


function getListOfMigrations(): string[] {
    return fs.readdirSync(__dirname + '/migrations')
}

function getMigrationByName(migrationName: string): MigrationInterface {
    const requiredMigration = require(__dirname + `/migrations/${migrationName}`)
    const migration = requiredMigration.default;
    return new migration(new PgPromiseConnectionAdapter());
}

function getUpOrDownMethodName(): UpOrDown {
    const upOrDownVariable = process.argv.find(argument => argument.includes('upOrDown'));
    if(!upOrDownVariable) throw new Error("you should pass the variable [--upOrDown=up] or [--upOrDown=down]")

    const stringUpOrDown = upOrDownVariable.split('=')[1]
    if(stringUpOrDown == 'up' || stringUpOrDown == 'down') return stringUpOrDown

    throw new Error('param needs to be "up" or "down"')
}

type UpOrDown = 'up' | 'down';

