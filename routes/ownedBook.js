import express from 'express'
import { getAll, create, getOne, edit, remove } from '../controllers/ownedBook.js'

const router = express.Router()

router.route('/').post(create)
router.route('/all').post(getAll)
router.route('/:id').get(getOne).patch(edit).delete(remove)


export default router