import 'dotenv/config'
import { expect, test, suite, beforeAll, afterAll } from 'vitest'
import { destroyConnection, getConnection, initDb } from '../src/connection'
import fs from 'fs'

const dbFile = process.env.DATABASE_FILE
const testDbFile = 'data/db/test.sqlite'

/**
 * Removes the specified database file if it exists.
 *
 * @param {string} dbFile - the path of the database file to be removed
 * @return {void}
 */
const removeDbFile = (dbFile) => {
  if (fs.existsSync(dbFile)) {
    fs.unlinkSync(dbFile)
  }
}
// setup
beforeAll(async () => {
  process.env.DATABASE_FILE = testDbFile
  destroyConnection()
  removeDbFile(testDbFile)
  await initDb()
})

// teardrop
afterAll(() => {
  destroyConnection()
  process.env.DATABASE_FILE = dbFile
  removeDbFile(testDbFile)
})

suite('Database connections and setup', () => {
  test('check connection status', () => {
    const knex = getConnection()
    expect(knex).toBeTruthy()
  })
  test('check migrations status', async () => {
    const knex = getConnection()
    const status = await knex.migrate.status()
    expect(status).toBe(0)
  })
  test('check migrations list', async () => {
    const knex = getConnection()
    const list = await knex.migrate.list()
    expect(list).toBeTypeOf('object')
  })
})
