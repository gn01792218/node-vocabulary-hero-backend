import { Router } from 'express'
import { verifyToken  } from "../middleware/authJWT"
import { isAdmin, isSuperAdmin } from "../middleware/roleVerify"

import { getAllRoles, getRole, createRole, updateRole,  deleteRole} from '../controllers/roleController'

const router = Router()

router.get('/',[verifyToken, isAdmin], getAllRoles)
router.get('/:id',[verifyToken, isAdmin], getRole)
router.post('/',[verifyToken, isSuperAdmin], createRole) 
router.put('/:id',[verifyToken, isSuperAdmin], updateRole)
router.delete('/:id',[verifyToken, isSuperAdmin], deleteRole)

export default router

