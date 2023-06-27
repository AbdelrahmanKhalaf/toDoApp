import { validator } from './../middlewares/validate';
import { userValidation } from './../model/user.model';
import { Router } from "express"
import { loginUser, register } from "../controller/auth.controller"

const router: Router = Router()

router.route('/login').post(loginUser)
router.route('/register').post(validator(userValidation, 'post'), register)

export default router