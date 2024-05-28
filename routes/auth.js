import express from 'express'
import { register, login, registerWithGoogle} from '../controllers/auth.js'

const router = express.Router()

router.route('/signup').post(register)
router.route('/signupWithGoogle').post(registerWithGoogle)
router.route('/login').post(login)

export default router