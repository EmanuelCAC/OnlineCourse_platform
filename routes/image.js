import express from 'express'
import { UploadProfilePic } from '../controllers/image.js'

const router = express.Router()

router.route('/:id').post(UploadProfilePic)

export default router