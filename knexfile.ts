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

/*module.exports = {
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
  useNullAsDefault: true,
};*/


module.exports = {
  

  testsql: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'database.sqlite'),
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
    },
    useNullAsDefault: true,
  },

  test: {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,

    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
    },
    useNullAsDefault: true,
  },

  development: {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,

    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
    },
    useNullAsDefault: true,
  },

  developmentSqlite: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src/database/database.sqlite'),
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
    },
    useNullAsDefault: true,
  },


  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  productionorigin: {
    client: 'postgresql',
    connection: {
      database: 'helprdb',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
