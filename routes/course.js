import express from 'express'
import { getAll, create, getOne, remove, edit } from '../controllers/course.js'

const router = express.Router()

router.route('/').get(getAll).post(create)
router.route('/:id').get(getOne).delete(remove).patch(edit)

export default router