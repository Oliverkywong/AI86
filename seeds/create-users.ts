import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        { player_id : 1001, name : "admin", password :"0001", email : "abc@gmail.com" },
        { player_id : 1002, name : "test", password :"0002", email : "test@hotmail.com" },
        { player_id : 1003, name : "player", password :"0003", email : "play@yahoo.com" }
    ]);
};
