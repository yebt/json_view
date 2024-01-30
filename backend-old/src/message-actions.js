const { getConnection } = require('./connection')

/**
 * Stores a message in the database.
 *
 * @param {object} data - the message data to be stored
 * @param {string} uuid - the unique identifier for the message
 * @return {Promise} a Promise that resolves to the inserted message
 */
const storeMessage = (data, uuid) => {
/**
 * Stores a message in the database.
 *
 * @param {object} data - the message data to be stored
 * @param {string} uuid - the unique identifier for the message
 * @return {Promise} a Promise that resolves to the inserted message
 */
  const timestamp = Date.now()
  const newMessage = {
    uuid,
    content: JSON.stringify(data),
    created_at: timestamp,
    updated_at: timestamp
  }
  return getConnection()('messages')
    .insert(newMessage)
}

/**
 * Retrieves a paginated list of messages from the database.
 *
 * @param {number} offset - The offset for paginating through the messages
 * @param {number} limit - The maximum number of messages to retrieve
 * @return {Promise<Array>} A promise that resolves to an array of messages
 */
const getPaginatedMessages = (offset = 0, limit = 10) => {
  const knex = getConnection()
  return knex
    .select('*')
    .from('messages')
    .offset(offset)
    .limit(limit)
}

/**
 * Retrieve the total count of messages from the database.
 *
 * @return {Promise<number>} The total count of messages as a Promise.
 */
const getTotalMessages = () => {
  const knex = getConnection()
  return knex
    .count('* as total')
    .from('messages')
    .first()
    .then((result) => result.total)
}

/**
 * Retrieves a single message from the 'messages' table by UUID.
 *
 * @param {string} uuid - The UUID of the message to retrieve
 * @return {Promise<object>} A promise that resolves to the retrieved message
 */
const getSingleMessageByUUID = (uuid) => {
  const knex = getConnection()
  return knex
    .select('*')
    .from('messages')
    .where('uuid', uuid)
    .first()
}

/**
 * Updates a message by its UUID.
 *
 * @param {string} uuid - The UUID of the message to update.
 * @param {Object} data - The data to update the message with.
 * @return {Promise} A promise that resolves with the result of the update query.
 */
const updateMessageByUUID = (uuid, data) => {
  const messageToUpdate = {
    content: JSON.stringify(data),
    updated_at: Date.now()
  }
  const knex = getConnection()
  return knex
    .update(messageToUpdate)
    .from('messages')
    .where('uuid', uuid)
}

/**
 * Deletes a message from the 'messages' table based on the provided UUID.
 *
 * @param {string} uuid - The UUID of the message to be deleted.
 * @return {Promise} A Promise representing the deletion operation.
 */
const deleteMessageByUUID = (uuid) => {
  const knex = getConnection()
  return knex
    .delete()
    .from('messages')
    .where('uuid', uuid)
}

/**
 * Clears all messages from the database.
 *
 * @return {Promise} A promise that resolves when the messages are cleared.
 */
const clearAllMessages = () => {
  const knex = getConnection()
  return knex
    .delete()
    .from('messages')
}

module.exports = {
  storeMessage,
  getPaginatedMessages,
  getTotalMessages,
  getSingleMessageByUUID,
  updateMessageByUUID,
  deleteMessageByUUID,
  clearAllMessages
}
