import { ObjectId } from "mongodb"
import mongoose, { Schema } from "mongoose"
import Joi from "joi"
export interface ItoDo {
    _id: String
    title: String
    des: string
    userId: ObjectId
}

const schema = new Schema(
    {
        title: { type: String, required: true },
        des: { type: String, required: true },
        userId: { type: ObjectId, ref: "user", required: true },
    },
    { timestamps: true },
)

export const ToDo = mongoose.model('toDo', schema)

export const toDoValidation = (user: ItoDo, reqType: string) => {
    const schema = Joi.object({
        title: Joi.string().alter({
            post: (schema: any) => schema.required(),
            put: (schema: any) => schema.optional(),
        }),
        des: Joi.string().alter({
            post: (schema: any) => schema.required(),
            put: (schema: any) => schema.optional(),
        }),
        userId: Joi.string().alter({
            post: (schema: any) => schema.required(),
            put: (schema: any) => schema.optional(),
        }),
    })
    return schema.tailor(reqType).validate(user)
}