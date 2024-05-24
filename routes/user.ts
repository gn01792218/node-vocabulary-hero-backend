import { Router } from 'express'
import { verifyToken  } from "../middleware/authJWT"
import { isAdmin, isSuperAdmin, isRoleListAllExist  } from "../middleware/roleVerify"

import { getAllUser, getUser, createUser, updateUser,  deleteUser, login, signUp} from '../controllers/userController'

const router = Router()

router.get('/users',[verifyToken, isSuperAdmin], getAllUser)
router.get('/users/:id',[verifyToken, isSuperAdmin], getUser)
router.post('/users',[verifyToken, isSuperAdmin, isRoleListAllExist], createUser) //要限定只有Admin以上才可以建立
router.put('/users/:id',[verifyToken, isSuperAdmin, isRoleListAllExist], updateUser)
router.delete('/users/:id',[verifyToken, isSuperAdmin], deleteUser)
router.post('/users/signUp', signUp)
router.post('/users/login', login)

export default router

