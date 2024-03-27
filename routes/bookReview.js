import express from 'express'
import authenticateUser from '../middleware/authentication.js'
import { getAll, create, getOne, edit, remove } from '../controllers/bookReview.js'

const router = express.Router()

router.route('/').get(getAll).post(authenticateUser, create)
router.route('/:id').get(getOne).patch(authenticateUser, edit).delete(authenticateUser, remove)

export default router