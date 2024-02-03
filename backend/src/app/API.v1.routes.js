import { Router } from 'express'
import messageRouter from '../modules/message/Message.routes.js'

const router = Router()

router.get('/', (req, res) => {
  res.json({ error: false, message: 'API v1 registred ⚙️✨' })
})

// Reister Message router
router.use('/messages', messageRouter)

export default router
