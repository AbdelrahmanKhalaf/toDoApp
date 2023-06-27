import mongoose, { Schema } from 'mongoose'
import { ObjectId } from 'mongodb'
import Joi, { array } from 'joi'

export interface IUser {
  _id: String
  name: String
  password: string
  email: String
  phone: String
  role: String
}
const userSchema = new Schema(
  {
    name: { type: String },
    password: { type: String },
    gender: { type: String },
    email: { type: String },
    phone: { type: Number },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true },
)

const User = mongoose.model('user', userSchema)
export default User

export const userValidation = (user: IUser, reqType: any) => {
  const schema = Joi.object({
    name: Joi.string().alter({
      post: (schema: any) => schema.required(),
    }),
    password: Joi.string().alter({
      post: (schema: any) => schema.required(),
    }),

    email: Joi.string().alter({
      post: (schema: any) => schema.required(),
    }),
    phone: Joi.string().alter({
      post: (schema: any) => schema.required(),
    }),
    role: Joi.string().valid('user', 'super admin', 'admin', 'sub admin'),
  })
  return schema.tailor(reqType).validate(user)
}
