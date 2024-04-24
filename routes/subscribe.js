import express from 'express'
import { subscribe } from '../controllers/subscribe.js'

const router = express.Router()

router.route('/').post(subscribe)

export default router