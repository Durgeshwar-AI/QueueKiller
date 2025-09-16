import { Router } from 'express'
import { getSchedule } from '../controllers/schedule.controller.js'

const router = Router()

router.get('/', getSchedule)

export default router