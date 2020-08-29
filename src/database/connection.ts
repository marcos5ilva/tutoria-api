import knex from 'knex';
import path from 'path';
import dotenv from "dotenv";
const configuration = require('../../knexfile');
dotenv.config();



/*const db = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite'),
  },
  useNullAsDefault: true,
});*/

/*const db = knex({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,

  useNullAsDefault: true,
})*/

const config =
  process.env.NODE_ENV === 'test'
    ? configuration.test
    : configuration.development;

const db = knex(config);
export default db;
