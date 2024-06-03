import { Router } from 'express'
import userRoute from './user'
import roleRoute from './role'
import vocabulary from './vocabulary'
import exampleRoute from './example'
import sentenceRoute from './sentence'
import noteRoute from './note'

const router = Router()

router.use('/users',userRoute)
router.use('/roles',roleRoute)
router.use('/vocabularys',vocabulary)
router.use('/examples',exampleRoute)
router.use('/sentences',sentenceRoute)
router.use('/notes', noteRoute)
router.use('/',(req,res)=>res.json({message:'歡迎光臨vocabulary hero api'}))

export default router