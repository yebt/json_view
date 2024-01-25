import 'dotenv/config'
import { expect, test, suite, beforeAll, afterAll } from 'vitest'
import { destroyConnection, initDb } from '../src/connection'
import fs from 'fs'
import crypto from 'node:crypto'
import { clearAllMessages, deleteMessageByUUID, getPaginatedMessages, getSingleMessageByUUID, getTotalMessages, storeMessage, updateMessageByUUID } from '../src/message-actions'

const dbFile = process.env.DATABASE_FILE
const testDbFile = 'data/db/test-actions.sqlite'

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

suite('Message actions', () => {
  const uuid = crypto.randomUUID()
  const content = { content: 'test', message: 'This is the lorem test' }
  // storeMessage,
  test('Storage message', async () => {
    const rslt = await storeMessage(content, uuid)
    expect(rslt).toBeTruthy()
  })
  // getPaginatedMessages,
  test('getPaginatedMessages', async () => {
    const rslt = await getPaginatedMessages(0, 10)
    expect(rslt).toBeTruthy()
    expect(rslt.length).toBe(10)
  })
  // getTotalMessages,
  test('getTotalMessages', async () => {
    const rslt = await getTotalMessages()
    expect(rslt).toBeTruthy()
    expect(rslt).toBeTypeOf('number')
  })

  // getSingleMessageByUUID,
  test('getSingleMessageByUUID', async () => {
    const rslt = await getSingleMessageByUUID(uuid)
    expect(rslt).toBeTruthy()
    expect(rslt.UUID).toBe(uuid)
    expect(rslt.content).toBeTypeOf('string')
    expect(rslt.content).toBe(JSON.stringify(content))
  })

  // updateMessageByUUID,
  content.pass = crypto.randomBytes(32).toString('hex')
  test('updateMessageByUUID', async () => {
    const rsltU = await updateMessageByUUID(uuid, content)
    expect(rsltU).toBe(1)
    const rslt = await getSingleMessageByUUID(uuid)
    expect(rslt).toBeTruthy()
    expect(rslt.UUID).toBe(uuid)
    expect(rslt.content).toBeTypeOf('string')
    expect(rslt.content).toBe(JSON.stringify(content))
  })

  // deleteMessageByUUID,
  test('deleteMessageByUUID', async () => {
    const rsltD = await deleteMessageByUUID(uuid)
    expect(rsltD).toBe(1)
    const rslt = await getSingleMessageByUUID(uuid)
    expect(rslt).toBeFalsy()
  })

  // clearAllMessages
  test('clearAllMessages', async () => {
    const rslt = await clearAllMessages()
    expect(rslt).toBeTruthy()
    expect(rslt).toBeGreaterThan(0)
    const rsltC = await getTotalMessages()
    expect(rsltC).toBe(0)
  })
})
