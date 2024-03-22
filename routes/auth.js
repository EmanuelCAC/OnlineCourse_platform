import express from 'express'
import { register, login } from '../controllers/auth.js'

const router = express.Router()

router.route('/signup').post(register)
router.route('/login').get(login)

export default router