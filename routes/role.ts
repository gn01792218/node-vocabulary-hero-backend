import { Router } from 'express'
import { verifyToken } from "../middleware/authJWT"

import { getAllRoles, getRole, createRole, updateRole,  deleteRole} from '../controllers/roleController'

const router = Router()

router.get('/roles',[verifyToken], getAllRoles)
router.get('/roles/:id',[verifyToken], getRole)
router.post('/roles',[verifyToken], createRole) 
router.put('/roles/:id',[verifyToken], updateRole)
router.delete('/roles/:id',[verifyToken], deleteRole)

export default router

