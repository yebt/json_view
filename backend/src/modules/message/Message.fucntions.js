import { getConnection } from '../../app/sqliteConnection.js'
import { UUID as UUIDVO } from '../uuid/UUID.js'

/**
 * @typedef {import('./Message').Message} Message
 */

/**
 * Store a message in the database.
 *
 * @param {Message} message - the message to be stored
 * @return {Promise<Array<number>>} a Promise that resolves to the result of inserting the message into the database
 */
export async function store (message) {
  const connection = await getConnection()
  const objToInsert = {
    UUID: message.UUID.value,
    author: message.author,
    tags: JSON.stringify(message.tags),
    content: message.content,
    created_at: message.createdAt,
    updated_at: message.updatedAt
  }
  return connection('messages').insert(objToInsert)
}

/**
 * Update a message in the database.
 *
 * @param {Message} message - the message object to update
 * @return {Promise<number>} the number of rows updated
 */
export async function update (message) {
  const connection = await getConnection()
  const objToUpdate = message.toJSON()
  objToUpdate.UUID = message.UUID.value()
  return connection('messages').where('UUID', objToUpdate.UUID).update(objToUpdate)
}

/**
 * Deletes a message from the database by its UUID.
 *
 * @param {string|UUIDVO} UUID - The UUID of the message to be deleted
 * @return {Promise<number>} A promise that resolves to the number of rows deleted
 */
export async function deleteByUUID (UUID) {
  const UUIDValue = UUID instanceof UUIDVO ? UUID.value() : UUID
  const connection = await getConnection()
  return connection('messages').where('UUID', UUIDValue).del()
}
