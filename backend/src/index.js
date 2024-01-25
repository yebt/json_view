require('dotenv').config()

const PORT = process.env.PORT || 3000
const express = require('express')
const cors = require('cors')
const path = require('path')
const {
  storeMessage,
  getPaginatedMessages,
  getTotalMessages,
  getSingleMessageByUUID,
  updateMessageByUUID,
  deleteMessageByUUID,
  clearAllMessages
} = require('./actions')
const server = express()
const messageRouter = express.Router()
const crypto = require('node:crypto')

server
  //   .use(express.static(path.join(__dirname, 'public')))
  .use(express.static('public'))
  .use(express.json())
  .use(cors())

//
server.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join('public', 'icon.svg'))
})

// ---------------------------------------------------------------------------

// Store message
messageRouter.post('/:uuid?', (req, res) => {
  const UUID = req.params.uuid ?? crypto.randomUUID()
  storeMessage(req.body, UUID)
    .then(() => {
      res.json({ success: true, message: 'Message stored' })
    })
    .catch((error) => {
      console.log(error)
      res.json({ success: false, message: 'Failed to store message' })
    })
})

// List meessages
messageRouter.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1 // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 10 // Default to 10 messages per page if not provided
  const offset = (page - 1) * limit
  console.log({ page, limit, offset })
  const queryes = [getPaginatedMessages(offset, limit), getTotalMessages()]
  Promise.all(queryes)
    .then((results) => {
      res.json({
        success: true,
        messages: results[0],
        pagination: { page, limit, total: results[1] }
      })
    })
    .catch((error) => {
      console.log(error)
      res.json({ success: false, message: 'Failed to retrieve messages' })
    })
})

// Single message
messageRouter.get('/:uuid', (req, res) => {
  const uuid = req.params.uuid
  getSingleMessageByUUID(uuid)
    .then((result) => {
      if (!result) {
        res
          .status(404)
          .json({ success: false, message: 'Message not found' })
        return
      }
      res.json({ success: true, message: result })
    })
    .catch((error) => {
      console.log(error)
      res.json({ success: false, message: 'Failed to retrieve message' })
    })
})

// Update message
messageRouter.put('/:uuid', (req, res) => {
  const uuid = req.params.uuid
  updateMessageByUUID(uuid, req.body)
    .then(() => {
      res.json({ success: true, message: 'Message updated' })
    })
    .catch((error) => {
      console.log(error)
      res.json({ success: false, message: 'Failed to update message' })
    })
})

// Delete message
messageRouter.delete('/:uuid', (req, res) => {
  const uuid = req.params.uuid
  deleteMessageByUUID(uuid)
    .then(() => {
      res.json({ success: true, message: 'Message deleted' })
    })
    .catch((error) => {
      console.log(error)
      res.json({ success: false, message: 'Failed to delete message' })
    })
})

// Delete all messages
messageRouter.delete('/clear', (req, res) => {
  clearAllMessages()
    .then(() => {
      res.json({ success: true, message: 'All messages deleted' })
    })
    .catch((error) => {
      console.log(error)
      res.json({ success: false, message: 'Failed to delete messages' })
    })
})

// Register Message Routes
server.use('/api/v1/messages', messageRouter)

// ---------------------------------------------------------------------------

server.get('/', (req, res) => {
  res.json({ success: true, message: 'Server running' })
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`http://localhost:${PORT}`)
})
