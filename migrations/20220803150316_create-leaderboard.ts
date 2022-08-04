import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable("leaderboard");
    if (!hasTable) {
        await knex.schema.createTable("leaderboard", (table) => {
            table.increments();
            table.integer("playerID").unsigned();
            table.integer("car_id").unsigned();
            table.string("racetime");
            table.string("map");
            table.timestamps(false, true);
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("leaderboard");
}

