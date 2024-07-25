import { Router } from 'express'
import { verifyToken  } from "../middleware/authJWT"
import { isMember, isSuperAdmin } from "../middleware/roleVerify"

import { getAll, getById, create, update,  deleteById} from '../controllers/testPaperController'

const router = Router()

router.get('/',[verifyToken, isMember], getAll)
router.get('/:id',[verifyToken, isMember], getById)
router.post('/',[verifyToken, isMember], create) 
router.put('/:id',[verifyToken, isMember], update)
router.delete('/:id',[verifyToken, isMember], deleteById)

export default router