import { Router } from 'express'
import MessageHTTPAdapter from './Message.responses.js'
import fs from 'fs'

const messageRouter = Router()

/**
 * Saves all request information to a log file.
 *
 * @param {import('http').IncomingMessage} req - the request object
 * @param {import('http').ServerResponse} res - the response object
 * @param {Function} next - the next function to be called
 * @return {void}
 */
const saveAllRequestInfo = (req, res, next) => {
  // console.log(req.headers, req.headersDistinct)
  if (!fs.existsSync('logs/')) {
    fs.mkdirSync('logs/')
  }
  fs.writeFileSync(
    `logs/request.${new Date().getTime()}.log`,
    JSON.stringify([req.headers, req.headersDistinct, req.method, req.url, req.query, req.body], null, 2)
  )
  next()
}

// Save a new message
messageRouter.post('/', MessageHTTPAdapter.storeMessageCommand)
// save a new debug message
messageRouter.post('/debug', saveAllRequestInfo, MessageHTTPAdapter.storeDebuggMessageCommand)
// Paginate messages
messageRouter.get('/', MessageHTTPAdapter.listMessagesCommand)
// Paginate Formatted messages
messageRouter.get('/formatted', MessageHTTPAdapter.listFormatedMessagesCommand)
// Get a specific message
messageRouter.get('/:UUID', MessageHTTPAdapter.showMessageCommand)
// Update a message
messageRouter.put('/:UUID', MessageHTTPAdapter.patchMessageCommand)
// Clear all messages
messageRouter.delete('/all', MessageHTTPAdapter.deleteAllMessageCommand)
// Delete a message
messageRouter.delete('/:UUID', MessageHTTPAdapter.deleteMessageCommand)

export default messageRouter
