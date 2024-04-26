import express from 'express'
import { getAll, getOne, create, edit, remove } from '../controllers/tempUser.js'

const router = express.Router()

router.route('/').get(getAll).post(create)
router.route('/:id').get(getOne).patch(edit).delete(remove)

export default router