import 'dotenv/config'
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  client: 'better-sqlite3',
  connection: {
    filename: process.env.DATABASE_FILENAME
  },
  migrations: {
    tableName: process.env.DATABASE_MIGRATIONS_TABLE || 'knex_migrations',
    directory: process.env.DATABASE_MIGRATIONS_DIR || './data/migrations',
    loadExtensions: ['.mjs']
  },
  seeds: {
    tableName: process.env.DATABASE_SEEDS_TABLE || 'knex_seeds',
    directory: process.env.DATABASE_SEEDS_DIR || './data/seeds',
    loadExtensions: ['.mjs']
  },
  useNullAsDefault: true

}
