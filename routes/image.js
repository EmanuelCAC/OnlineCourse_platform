import express from 'express'
import { teste } from '../controllers/image.js'

const router = express.Router()

router.route('/:id').post(teste)

export default router