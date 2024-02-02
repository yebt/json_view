import 'dotenv/config'
import { suite, test, expect } from 'vitest'
import { getConnection } from '../../src/app/sqliteConnection'

suite('Test database conenction', async () => {
  const k = await getConnection()
  test('Connection', async () => {
    expect(k).toBeTruthy()
  })
  test('Client', async () => {
    expect(k.client.config.client).toBe('better-sqlite3')
  })
  test('Filename database', async () => {
    expect(k.client.config.connection.filename).toBe(process.env.DATABASE_FILENAME)
  })
  test('Migrations', async () => {
    const result = await k.schema.hasTable('messages')
    expect(result).toBe(true)
  })
})
