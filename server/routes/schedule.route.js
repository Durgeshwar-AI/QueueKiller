import { Router } from 'express'
import { bookTimeSlot, createSchedule, deleteTimeSlot, getAvailableSlots, getDepartmentSchedule, getSchedule, updateTimeSlot } from '../controllers/schedule.controller.js'

const router = Router()

router.get('/', getSchedule)
router.post('/create',createSchedule)
router.get('/getDepartments',getDepartmentSchedule)

router.put('/update/:id',updateTimeSlot)
router.delete('/delete/:id',deleteTimeSlot)
router.get('/getAvailable',getAvailableSlots)
router.post('/book',bookTimeSlot)

export default router