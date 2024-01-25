// Update with your config settings.

require('dotenv').config()

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: 'better-sqlite3',
  connection: {
    filename: process.env.DATABASE_FILE,
    password: process.env.DATABASE_PASSWORD
  },
  useNullAsDefault: true,
  migrations: {
    tableName: 'migrations',
    directory: './data/migrations'
  },
  seeds: {
    directory: 'data/seeds'

  }
}
