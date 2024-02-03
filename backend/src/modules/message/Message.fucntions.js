import { getConnection } from '../../app/sqliteConnection.js'

/**
 * @typedef {import('./Message').Message} Message
 * @typedef {import('../uuid/UUID').UUID} UUID
 */

/**
 * Store a message in the database.
 *
 * @param {Message} message - the message to be stored
 * @return {Promise<Array<number>>} a Promise that resolves to the result of inserting the message into the database
 */
async function store (message) {
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
 * Retrieves a message by UUID.
 *
 * @param {UUID} UUID - the UUID of the message
 * @return {Promise<Message?>} The message with the given UUID, wrapped in a Promise
 */
async function show (UUID) {
  const UUIDValue = UUID.value()
  const connection = await getConnection()
  return connection('messages').where('UUID', UUIDValue).first()
}

/**
 * Retrieves a list of messages from the database with optional limit and offset parameters.
 *
 * @param {number} limit - The maximum number of messages to retrieve
 * @param {number} offset - The number of messages to skip before starting to return messages
 * @return {Promise<Array>} A promise that resolves to an array of messages
 */
async function index (limit = 10, offset = 0) {
  const connection = await getConnection()
  return connection('messages').select().limit(limit).offset(offset)
}

/**
 * Update a message in the database.
 *
 * @param {Message} message - the message object to update
 * @return {Promise<number>} the number of rows updated
 */
async function update (message) {
  const connection = await getConnection()
  const objToUpdate = message.toJSON()
  objToUpdate.UUID = message.UUID.value()
  return connection('messages').where('UUID', objToUpdate.UUID).update(objToUpdate)
}

/**
 * Deletes a message from the database by its UUID.
 *
 * @param {UUID} UUID - The UUID of the message to be deleted
 * @return {Promise<number>} A promise that resolves to the number of rows deleted
 */
async function destroy (UUID) {
  const UUIDValue = UUID.value()
  const connection = await getConnection()
  return connection('messages').where('UUID', UUIDValue).del()
}

/**
 * Destroys all messages in the database.
 *
 * @return {Promise<number>} The number of messages destroyed
 */
async function destroyAll () {
  const connection = await getConnection()
  return connection('messages').del()
}

/**
 * Asynchronous function to calculate the total count of messages.
 *
 * @return {Promise<number>} The total count of messages
 */
async function total () {
  const connection = await getConnection()
  return connection('messages')
    .count('* as total')
    .first()
    .then((result) => result.total)
}

const MessageDBAdapter = {
  store,
  show,
  index,
  update,
  destroy,
  destroyAll,
  total
}
export default MessageDBAdapter
