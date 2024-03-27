import express from 'express'
import { getAll, create, getOne, edit, remove } from '../controllers/bookReview.js'

const router = express.Router()

router.route('/').get(getAll).post(create)
router.route('/:id').get(getOne).patch(edit).delete(remove)

export default router