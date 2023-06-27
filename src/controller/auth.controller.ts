import { NextFunction, Request, Response } from 'express'
import { generateToken } from '../helper/generateToken'
import { AuthenticatedRequest } from '../middlewares/auth'
import User, { IUser } from '../model/user.model'
import bcrypt from 'bcryptjs'
//@DESC  Register
//@ROUTE POST /toDo/api/v1/auth/register
//@ACCESS: Public
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user)
      return res
        .status(400)
        .send({ success: false, error: 'The user already exists with the mail you entered . ' })
    const newUser = new User({
      ...req.body,
      role: "user",
      password: bcrypt.hashSync(req.body.password, 10),
    })
    await newUser.save()
    res.status(200).send({
      success: true,
      message: 'Successfully registered , Welcome ',
      user: newUser,
    })
  } catch (err) {
    next(err)
  }
}
//@DESC  LoginUser
//@ROUTE POST /toDo/api/v1/auth/login
//@ACCESS: public
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check if email is the exist to that user
    const user = await User.findOne({ email: req.body.email })
    const isMatch = user
      ? bcrypt.compareSync(req.body.password, user.password)
      : false
    if (!isMatch || !user)
      return res.status(400).send({
        success: false,
        error: 'Invalid email or password',
      })
    const token = user._id ? generateToken(user?._id) : ''
    return res
      .status(200)
      .header('Authorization', token)
      .send({
        success: true,
        message: 'Loged in Successfully , Welcome',
        res: { user, token: token },
      })
  } catch (err) {
    next(err)
  }
}

