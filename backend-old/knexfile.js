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
    tableName: process.env.DATABASE_MIGRATIONS_TABLE || 'migrations',
    directory: process.env.DATABASE_MIGRATIONS_DIR || './data/migrations'
  },
  seeds: {
    tableName: process.env.DATABASE_SEEDS_TABLE || 'seeds',
    directory: process.env.DATABASE_SEEDS_DIR || 'data/seeds'
  }
}
