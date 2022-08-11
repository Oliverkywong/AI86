import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("users_car"))) {
        await knex.schema.createTable("users_car", (table) => {
            table.increments();
            table.integer("users_id").unsigned();
            table.foreign("users_id").references("users.id");
            table.integer("car_id").unsigned();
            table.foreign("car_id").references("car.id");
            table.timestamps(false, true);
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("users_car")
}

