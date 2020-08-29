import knex from 'knex';
import path from 'path';
import dotenv from "dotenv";
import configuration from '../../knexfile';
dotenv.config();



/*const db = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite'),
  },
  useNullAsDefault: true,
});*/

const db = knex({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: ['knex', 'public'],
  useNullAsDefault: true,
})

export default db;
