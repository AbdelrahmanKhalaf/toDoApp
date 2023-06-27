import { NextFunction, Request, Response } from "express"
import User from "../model/user.model"
import { ErorrResponse } from "../errors/errorResponse"
import { ToDo } from "../model/toDo.model"

export const checkUser = (mode: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errorValid = new ErorrResponse("Please select a valid user the user you entered is not valid.", 400)
        const { userId } = req.body
        const user = await User.findById(mode == "post" ? userId : req.params.userId)
        if (!user) return res.status(errorValid.statusCode).send({ success: false, error: errorValid.message })
        console.log(mode);
        
        // for all errors must handled else func post 
        if (mode !== "post" && mode !=="getAll") {

            const errorNotFoundToDo = new ErorrResponse("The Todo is not found wiht the Given ID in that the user ,maybe deleted or renamed.", 400)
            const { userId, todoId } = req.params
            const todo = await ToDo.findOne({ _id: todoId, userId: userId, })
            if (!todo) return res.status(errorNotFoundToDo.statusCode).send({ error: errorNotFoundToDo.message })
        }
        next()
    } catch (err) {
        next(err)
    }
}