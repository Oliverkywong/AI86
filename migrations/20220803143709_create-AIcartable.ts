import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable("AIcar");
    if (!hasTable) {
        await knex.schema.createTable("AIcar", (table) => {
            table.increments();
            table.integer("AIcar_id").unsigned();
            table.foreign("AIcar_id").references("users.id");
            table.string("description");
            table.string("file");
            table.string("map");
            table.timestamps(false, true);
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("AIcar");
}

