import { Message } from './Message.js'
import { store } from './Message.fucntions.js'
import { UUID as UUIDVO } from '../uuid/UUID.js'

/**
 * @typedef {import('http').ServerResponse} ServerResponse
 * @typedef {import('http').IncomingMessage} IncomingMessage
 */

/**
 * Store a message from the request body and return the result.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @return {Promise} A Promise that resolves to the result of storing the message
 */
export function storeMessage (req, res) {
  const timestamp = new Date().getTime()
  const UUID = req.body.UUID ? new UUIDVO(req.body.UUID) : UUIDVO.generate()
  delete req.body.UUID
  const tags = req.body.tags || []
  delete req.body.tags

  const author =
    req.body.author ||
    (req.headers['x-forwarded-for'] ?? '') +
      '@' +
      (req.socket.remoteAddress ?? '')
  delete req.body.author
  const objToInsert = {
    UUID,
    author,
    tags,
    content: JSON.stringify(req.body),
    createAt: timestamp,
    updateAt: timestamp
  }
  const message = Message.create(objToInsert)
  store(message)
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
