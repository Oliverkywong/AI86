import { Knex } from "knex";
import { hashPassword } from "../util/hash"

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    let a = await hashPassword("0001")
    let b = await hashPassword("0002")
    let c = await hashPassword("0003")
    await knex("users").insert([
        { player_id : 1001, name : "admin", password : a, email : "abc@gmail.com" },
        { player_id : 1002, name : "test", password : b, email : "test@hotmail.com" },
        { player_id : 1003, name : "player", password : c, email : "play@yahoo.com" }
    ]);
};
