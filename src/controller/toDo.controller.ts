import { NextFunction, Request, Response } from "express"
import { ToDo } from "../model/toDo.model"
import { ErorrResponse } from "../errors/errorResponse"
const errorNotFound = new ErorrResponse("The Todo is not found wiht the Given ID", 400)
//@DESC Add new to do for specific user
//@ROUTE POST /toDo/api/v1/todo/:userId
//@ACCESS: Private(admin)
export const AddNewToDoForUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todo = new ToDo({ ...req.body })
        todo.save()
        return res.send({
            success: true,
            message: "Added new to do for that user successfully. ",
            data: todo
        })
    } catch (err) {
        next(err)
    }
}
//@DESC Update an existing to do for specific user
//@ROUTE PUT /toDo/api/v1/todo/:userId/:todoId
//@ACCESS: Private(admin)
export const UpdateToDoForUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, todoId } = req.params
        const todo = await ToDo.findOneAndUpdate({ _id: todoId, userId: userId, }, {
            $set: {
                ...req.body
            },

        }, { new: true })
        return res.send({
            message: "The to do for this specific user have been updated",
            success: true,
            data: todo
        })
    } catch (err) {
        next(err)
    }
}
//@DESC Delete an existing to do for specific user
//@ROUTE DELETE /toDo/api/v1/todo/:userId/:todoId
//@ACCESS: Private(admin)
export const deleteToDoForUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, todoId } = req.params
        await ToDo.deleteOne({ _id: todoId, userId: userId })
        return res.send({
            message: "The to do for this specific user have been deleted",
            success: true,
        })
    } catch (err) {
        next(err)
    }
}
//@DESC Get to do information for specific user.
//@ROUTE GET /toDo/api/v1/todo/:userId/:todoId
//@ACCESS: Private(admin)
export const getToDoForUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, todoId } = req.params
        const todo = await ToDo.findOne({ _id: todoId, userId: userId })
        return res.send({
            message: "The to do for this specific user have been fached",
            success: true,
            data: todo
        })
    } catch (err) {
        next(err)
    }
}
