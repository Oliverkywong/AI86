import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable("car");
    if (!hasTable) {
        await knex.schema.createTable("car", (table) => {
            table.increments();
            table.string("model");
            table.string("color");
            table.timestamps(false, true);
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("car");
}

