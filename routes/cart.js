import express from 'express'
import { getAll, create, getByUser, remove, edit } from '../controllers/cart.js'

const router = express.Router()

router.route('/').post(getByUser).delete(remove).patch(edit)
router.route('/new').post(create)

export default router