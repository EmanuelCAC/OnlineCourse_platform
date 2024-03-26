import express from 'express'
import { getAll, create, getOne, remove } from '../controllers/books.js'

const router = express.Router()

router.route('/').get(getAll).post(create)
router.route('/:id').get(getOne).delete(remove)

export default router