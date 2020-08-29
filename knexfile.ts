import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

/*module.exports = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'src/database/database.sqlite'),
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
  useNullAsDefault: true,
};*/

module.exports = {
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
  useNullAsDefault: true,
};