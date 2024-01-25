import 'dotenv/config'
import { expect, test, beforeAll, afterAll } from 'vitest'
import { destroyConnection, getConnection, initDb } from '../src/connection'
import fs from 'fs'

const dbFile = process.env.DATABASE_FILE
const testDbFile = 'data/db/test.sqlite'

beforeAll(async () => {
  process.env.DATABASE_FILE = testDbFile
  destroyConnection()
  if (fs.existsSync(process.env.DATABASE_FILE)) {
    fs.unlinkSync(process.env.DATABASE_FILE)
  }
  await initDb()
})

afterAll(() => {
  destroyConnection()
  process.env.DATABASE_FILE = dbFile
})

test('check connection status', () => {
  const knex = getConnection()
  expect(knex).toBeTruthy()
})
