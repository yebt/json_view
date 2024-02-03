import { Router } from 'express'
import MessageHTTPAdapter from './Message.responses.js'

const messageRouter = Router()

// Save a new message
messageRouter.post('/', MessageHTTPAdapter.storeMessageCommand)
// save a new debug message
messageRouter.post('/debug', MessageHTTPAdapter.storeDebuggMessageCommand)
// Paginate messages
messageRouter.get('/', MessageHTTPAdapter.listMessagesCommand)
// Get a specific message
messageRouter.get('/:UUID', MessageHTTPAdapter.showMessageCommand)
// Update a message
messageRouter.put('/:UUID', MessageHTTPAdapter.patchMessageCommand)
// Delete a message
messageRouter.delete('/:UUID', MessageHTTPAdapter.deleteMessageCommand)

export default messageRouter
