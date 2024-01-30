import 'dotenv/config'
import { expect, test, suite, beforeAll, afterAll } from 'vitest'
import { destroyConnection, getConnection, initDb } from '../../src/connection'
import fs from 'fs'
import supertest from 'supertest'

const dbFile = process.env.DATABASE_FILE
const testDbFile = 'test/data/test-actions.sqlite'

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
  process.env.DATABASE_SEEDS_DIR = 'test/data/seeds'
  process.env.DATABASE_MIGRATIONS_DIR = 'test/data/migrations'
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

suite('Server message endpoints', () => {
  test('GET api/v1/messages - List paginated messages', () => {
    const knex = getConnection()
    expect(knex).toBeTruthy()
  })
})
