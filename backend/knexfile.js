// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: 'better-sqlite3',
  connection: {
    filename: 'data/database.db'
  },
  useNullAsDefault: true,
  migrations: {
    tableName: 'migrations',
    directory: 'migrations'
  },
  seeds: {
    directory: 'seeds'
  }
}
