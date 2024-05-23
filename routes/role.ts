import { Router } from 'express'

import { getAllRoles, getRole, createRole, updateRole,  deleteRole} from '../controllers/roleController'

const router = Router()

router.get('/roles', getAllRoles)
router.get('/roles/:id', getRole)
router.post('/roles', createRole) 
router.put('/roles/:id', updateRole)
router.delete('/roles/:id', deleteRole)

export default router

