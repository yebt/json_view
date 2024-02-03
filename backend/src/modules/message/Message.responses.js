import { Message } from './Message.js'
import { UUID as UUIDVO } from '../uuid/UUID.js'
import MessageDBAdapter from './Message.fucntions.js'
import { requireBody, requireParam } from '../../app/utils/util.response.js'

function getAuthorFromRequest (req) {
  return req.body.author ||
    (req.headers['x-forwarded-for'] ?? '') +
      '@' +
      (req.socket.remoteAddress ?? '')
}

/**
 * @typedef {import('http').ServerResponse} ServerResponse
 * @typedef {import('http').IncomingMessage} IncomingMessage
 */

/**
 * Store a message from the request body and return the result.
 *
 * @param {IncomingMessage} req - The request object
 * @param {ServerResponse} res - The response object
 * @return {Promise} A Promise that resolves to the result of storing the message
 */
function storeMessageCommand (req, res) {
  const timestamp = new Date().getTime()
  for (const key in ['author', 'tags', 'content']) {
    if (!requireBody(req, res, key)) return
  }
  if (!req.body.UUID) {
    req.body.UUID = UUIDVO.generate()
  }
  const messageToIntert = Message.create({
    UUID: new UUIDVO(req.body.UUID),
    author: getAuthorFromRequest(req),
    tags: req.body.tags || [],
    content: JSON.stringify(req.body),
    createAt: timestamp,
    updateAt: timestamp
  })

  MessageDBAdapter.store(messageToIntert)
    .then((result) => {
      res.status(201).json({
        error: false,
        message: 'Message created successfully',
        data: result
      })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({
        error: true,
        message: err.message
      })
    })
}

/**
 * Store a debug message command.
 *
 * @param {IncomingMessage} req - the request object
 * @param {ServerResponse} res - the response object
 * @return {Promise} a Promise that resolves to the result of the storage operation
 */
function storeDebuggMessageCommand (req, res) {
  const timestamp = new Date().getTime()
  const UUID = req.body.UUID ? new UUIDVO(req.body.UUID) : UUIDVO.generate()
  delete req.body.UUID
  const tags = req.body.tags || []
  delete req.body.tags
  const author = getAuthorFromRequest(req)
  delete req.body.author
  const content = JSON.stringify(req.body)

  const messageToIntert = Message.create({
    UUID,
    author,
    tags,
    content,
    createAt: timestamp,
    updateAt: timestamp
  })

  MessageDBAdapter.store(messageToIntert)
    .then((result) => {
      res.status(201).json({
        error: false,
        message: 'Message created successfully',
        data: result
      })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({
        error: true,
        message: err.message
      })
    })
}

/**
 * A function to list messages for the driver.
 *
 * @param {IncomingMessage} req - the request object
 * @param {ServerResponse} res - the response object
 * @return {Promise} a promise that resolves to the JSON response
 */
async function listMessagesCommand (req, res) {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const offset = (page - 1) * limit
  const total = await MessageDBAdapter.total()
  const nextUrl = page < Math.ceil(total / limit) ? `http://${req.headers.host}${req.baseUrl}?page=${page + 1}&limit=${limit}` : null
  MessageDBAdapter.index(limit, offset)
    .then((result) => {
      res.json({
        error: false,
        data: result,
        next: nextUrl
      })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({
        error: true,
        message: err.message
      })
    })
}

/**
 * Display the message driver based on the UUID provided in the request parameters.
 *
 * @param {IncomingMessage} req - the request object
 * @param {ServerResponse} res - the response object
 * @return {Promise} a Promise that resolves to the result data or rejects with an error message
 */
function showMessageCommand (req, res) {
  if (!requireParam(req, res, 'UUID')) { return null }

  MessageDBAdapter.show(new UUIDVO(req.params.UUID))
    .then((result) => {
      res.json({
        error: false,
        data: result
      })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({
        error: true,
        message: err.message
      })
    })
}

/**
 * Update a message command and return the result.
 *
 * @param {IncomingMessage} req - the request object
 * @param {ServerResponse} res - the response object
 * @return {Promise<number>} a promise with the updated message result
 */
function patchMessageCommand (req, res) {
  if (!requireParam(req, res, 'UUID')) { return null }
  const timestamp = new Date().getTime()
  const UUID = new UUIDVO(req.body.UUID)
  const objToPath = {
    UUID,
    updateAt: timestamp
  };
  ['author', 'tags', 'content'].forEach(element => {
    if (req.body[element]) {
      objToPath[element] = req.body[element]
    }
  })

  MessageDBAdapter.update(Message.create(objToPath))
    .then((result) => {
      res.json({
        error: false,
        message: 'Message updated successfully',
        data: result
      })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({
        error: true,
        message: err.message
      })
    })
}

/**
 * Deletes a message using the provided UUID.
 *
 * @param {IncomingMessage} req - the request object
 * @param {ServerResponse} res - the response object
 * @return {null} if required parameter is missing, or JSON object with error, message, and data fields
 */
function deleteMessageCommand (req, res) {
  if (!requireParam(req, res, 'UUID')) { return null }
  MessageDBAdapter.delete(new UUIDVO(req.params.UUID))
    .then((result) => {
      res.json({
        error: false,
        message: 'Message deleted successfully',
        data: result
      })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({
        error: true,
        message: err.message
      })
    })
}

/**
 * Delete all message command.
 *
 * @param {IncomingMessage} req - the request object
 * @param {ServerResponse} res - the response object
 * @return {type}
 */
function deleteAllMessageCommand (req, res) {
  MessageDBAdapter.destroyAll()
    .then((result) => {
      res.json({
        error: false,
        message: 'All messages deleted successfully',
        data: result
      })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({
        error: true,
        message: err.message
      })
    })
}

const MessageHTTPAdapter = {
  storeMessageCommand,
  storeDebuggMessageCommand,
  listMessagesCommand,
  showMessageCommand,
  patchMessageCommand,
  deleteMessageCommand,
  deleteAllMessageCommand
}
export default MessageHTTPAdapter
