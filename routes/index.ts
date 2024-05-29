import { Router } from 'express'
import userRoute from './user'
import roleRoute from './role'
import vocabulary from './vocabulary'
import exampleRoute from './example'
import sentenceRoute from './sentence'

const router = Router()

router.use(userRoute)
router.use(roleRoute)
router.use(vocabulary)
router.use(exampleRoute)
router.use(sentenceRoute)

export default router