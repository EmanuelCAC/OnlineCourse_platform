import express from 'express'
import { register, login, confirmAccount } from '../controllers/auth.js'

const router = express.Router()

router.route('/signup').post(register)
router.route('/confirm').get(confirmAccount)
router.route('/login').post(login)

export default router