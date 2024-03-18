import express from 'express'
import { getAll, create } from '../controllers/books.js'

const router = express.Router()

router.route('/').get(getAll).post(create)

export default router