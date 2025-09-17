import { Router } from 'express'
import { createSchedule, getSchedule } from '../controllers/schedule.controller.js'

const router = Router()

router.get('/', getSchedule)
router.post('/create',createSchedule)

export default router