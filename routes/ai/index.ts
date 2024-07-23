import { Router } from 'express'
import chatRoute from './chat'
const router = Router()

router.use('/chat', chatRoute)
router.use('/',(req,res)=>res.json({message:'這是ai的相關API'}))

export default router