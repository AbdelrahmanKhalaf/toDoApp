import { NextFunction, Request, Response } from 'express'
import colors from 'colors'
import { ErorrResponse } from './errorResponse'
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("dadadad", err, "errorrrrrr")
  let error: any
  //Mongose bad objectId
  if (err.name == 'CastError') {
    const message = `The todo not found with id of ${err.value}`
    error = new ErorrResponse(message, 404)
  }
  //Error dublicate key
  if (err.code === 1100) {
    const message = 'Dublicate field value entered '
    error = new ErorrResponse(message, 400)
  }
  //Mongose Validtion Error "HttpErrorResponse"
  if (err.name == 'ValidationError') {
    const message: any = Object.values(err.errors).map((val: any) => val.message)
    error = new ErorrResponse(message, 500)
  }
  console.log(err)

  res.status(error?.statusCode || 500).json({
    success: false,
    error: error?.message || 'SERVER ERROR',
  })
}
