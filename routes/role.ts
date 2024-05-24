import { Router } from 'express'
import { verifyToken  } from "../middleware/authJWT"
import { isAdmin, isSuperAdmin } from "../middleware/roleVerify"

import { getAllRoles, getRole, createRole, updateRole,  deleteRole} from '../controllers/roleController'

const router = Router()

router.get('/roles',[verifyToken, isAdmin], getAllRoles)
router.get('/roles/:id',[verifyToken, isAdmin], getRole)
router.post('/roles',[verifyToken, isSuperAdmin], createRole) 
router.put('/roles/:id',[verifyToken, isSuperAdmin], updateRole)
router.delete('/roles/:id',[verifyToken, isSuperAdmin], deleteRole)

export default router

