import { Router } from 'express'
import { verifyToken  } from "../middleware/authJWT"
import { isAdmin, isSuperAdmin, isRoleListAllExist, isMember  } from "../middleware/roleVerify"

import { getAllUser, getUserById, getUser, createUser, updateUser,  deleteUser, login, logOut, signUp, refreshToken} from '../controllers/userController'

const router = Router()

router.get('/users',[verifyToken, isMember], getAllUser)
router.get('/users/userInfo',[verifyToken, isMember], getUser)
router.get('/users/:id',[verifyToken, isMember], getUserById)
router.put('/users/:id',[verifyToken, isSuperAdmin, isRoleListAllExist], updateUser)
router.post('/users',[verifyToken, isSuperAdmin, isRoleListAllExist], createUser) //要限定只有Admin以上才可以建立
router.delete('/users/:id',[verifyToken, isSuperAdmin], deleteUser)
router.post('/users/signUp', signUp)
router.post('/users/login', login)
router.post('/users/logOut',[verifyToken], logOut)
router.post('/users/refreshToken', refreshToken)

export default router

