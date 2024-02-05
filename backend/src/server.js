import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { notFoundHandler, serverErrorHandler } from './app/handlers.js'
import APIV1routes from './app/API.v1.routes.js'

//  ---------------------------------------------------
const PORT = process.env.PORT || 3000
//  ---------------------------------------------------
const app = express()
app.use(cors()) // Validate cors
  .use(express.json()) // support json bodies
  .use(express.urlencoded({ extended: true })) // suport encoded bodies
//  ---------------------------------------------------
app.get('/', (req, res, next) => {
  res.json({ error: false, message: 'Express server is working 🚀️😎' })
})
//  ---------------------------------------------------
app.use('/api/v1', APIV1routes)
//  ---------------------------------------------------
app.use(notFoundHandler).use(serverErrorHandler)
//  ---------------------------------------------------
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
  if (process.env.NODE_ENV !== 'test') {
    console.log(`http://localhost:${PORT}`)
  }
})
