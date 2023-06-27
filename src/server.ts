import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import { connection } from './db/connection'
import morgan from 'morgan'
import auth from './router/auth.routes'
import todo from './router/todo.routes'
import path from 'path'
import cors from 'cors'
import { upload } from './helper/upload.helper'
import { errorHandler } from './errors/error'
dotenv.config({ path: path.join(__dirname, '.env') })
const app = express()
const port = process.env.PORT || 8080
/// middle wares for logger and express bodyParser
app
  .use(express.json())
  .use(morgan('dev'))
  .use(cors())
  .use('/uploads', express.static('uploads'))
  .use('/toDo/api/v1/auth', auth)
  .use('/toDo/api/v1/todo', todo)
  .use(errorHandler)

  // unhandled Route
  .use('*', (req: Request, res: Response) => {
    res.status(404).send({ success: false, message_en: 'UnHandled Route' })
  })
app.listen(port, () => {
  console.log('listening on port : ', port)
  connection()
})
