import 'dotenv/config'
import Knex from 'knex'
import knexConfig from '../../knexfile.mjs'
import { existsSync } from 'fs'
// import { execSync } from 'child_process'
let connection = null

/**
 * Retrieves a connection to the database, creating a new one if necessary and performing migration if needed.
 *
 * @return {Promise<Knex>} The database connection
 */
export async function getConnection () {
  if (!connection) {
    connection = Knex(knexConfig)
    if (!existsSync(connection.client.config.connection.filename)) {
      return connection.migrate.latest(knexConfig)
        .then(() => {
          console.log('Database migrated')
          return connection.seed.run()
        })
        .then(() => {
          console.log('Database seeded')
          return connection
        })
    }
  }
  return connection
}
