import type { Knex } from "knex";
import dotenv from "dotenv";
dotenv.config()


const config: { [key: string]: Knex.Config } = {
  development: {
    // debug: true,
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST || "localhost",
      database: process.env.DB_NAME,
      user:     process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  test:{
    client: 'postgresql',
    connection: {
        host: process.env.DB_HOST || "localhost",
        database: process.env.TESTDB_NAME,
        user:     process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations'
    } 
  },

  staging: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST || "localhost",
      database: process.env.DB_NAME,
      user:     process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST || "localhost",
      database: process.env.DB_NAME,
      user:     process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

module.exports = config;
