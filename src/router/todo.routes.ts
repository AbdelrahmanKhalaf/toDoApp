import { UpdateToDoForUser, deleteToDoForUser, getAllToDoForUser, getToDoForUser } from './../controller/toDo.controller';
import { Router } from "express"
import { AddNewToDoForUser } from "../controller/toDo.controller"
import { validator } from "../middlewares/validate"
import { AuthenticationMiddleWare } from "../middlewares/auth"
import { checkRole } from "../middlewares/acsses"
import { Roles } from "../enum/Roles"
import { toDoValidation } from "../model/toDo.model"
import { checkUser } from "../middlewares/checkUser"

const router: Router = Router()
router.route('/').post(
    AuthenticationMiddleWare,
    checkRole(Roles.ADMIN),
    validator(toDoValidation, "post"), checkUser("post"), AddNewToDoForUser)
    
router.route('/:userId/').all(AuthenticationMiddleWare, checkRole(Roles.ADMIN))
    .get(checkUser('getAll'), getAllToDoForUser)

router.route('/:userId/:todoId').all(AuthenticationMiddleWare, checkRole(Roles.ADMIN))
    .put(validator(toDoValidation, "post"), checkUser("put"), UpdateToDoForUser)
    .delete(checkUser("delete"), deleteToDoForUser)
    .get(checkUser('get'), getToDoForUser)

export default router