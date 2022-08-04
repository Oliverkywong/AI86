// import Knex from "knex";
import dotenv from "dotenv";

import { Client } from 'pg'

dotenv.config();

export const client = new Client({
	database: process.env.DB_NAME,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD
})

// const knexConfigs = require("./knexfile");
// const configMode = process.env.NODE_ENV || "development";
// const knexConfig = knexConfigs[configMode];
// const knex = Knex(knexConfig);

 