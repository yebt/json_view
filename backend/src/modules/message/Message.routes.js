import { Router } from 'express'
import { storeMessage } from './Message.responses.js'

const messageRouter = Router()

// Save a new message
messageRouter.post('/', storeMessage)

// List all messages
messageRouter.get('/', (req, res) => {
  res.json({ error: false, message: 'Message api registred ✉️' })
})

export default messageRouter
