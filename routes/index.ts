import { Router } from 'express'
import userRoute from './user'
import roleRoute from './role'
import vocabulary from './vocabulary'

const router = Router()

router.use(userRoute)
router.use(roleRoute)
router.use(vocabulary)

export default router