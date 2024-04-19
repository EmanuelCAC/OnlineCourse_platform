import express from 'express'
import authenticateUser from '../middleware/authentication.js'
import { getAll, create, getOne, edit, remove } from '../controllers/mentorReview.js'

const router = express.Router()

router.route('/').post(authenticateUser, create)
router.route('/all').post(getAll)
router.route('/:id').get(getOne).patch(authenticateUser, edit).delete(authenticateUser, remove)


export default router