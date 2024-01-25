const knex = require('knex')
let conn = null

/**
 * Initializes the database by running migrations and seeding the database.
 *
 * @return {Promise} A promise that resolves when the database is initialized.
 */
const initDb = async () => {
  const kenexConfig = require('../knexfile.js')
  const ic = getConnection()
  await ic.migrate.latest(kenexConfig)
    .then((res) => ic.seed.run())
}

/**
 * Retrieves the connection object, initializing it if necessary.
 *
 * @return {knex.Knex} The connection object.
 */
const getConnection = () => {
  if (!conn) {
    const kenexConfig = require('../knexfile.js')
    conn = knex(kenexConfig)
  }
  return conn
}

/**
 * Destroys the connection if it exists.
 */
const destroyConnection = () => {
  if (conn) {
    conn.destroy()
    conn = null
  }
}

module.exports = {
  getConnection,
  destroyConnection,
  initDb
}
