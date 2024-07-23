import { Router } from 'express'
import { verifyToken  } from "../../middleware/authJWT"
import { isMember } from "../../middleware/roleVerify"

import { chatComplete } from '../../controllers/chatCompletionsController'

const router = Router()

router.post('/complete',[verifyToken, isMember], chatComplete)

export default router