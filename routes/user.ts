import { Router } from 'express'
import { verifyToken  } from "../middleware/authJWT"
import { isAdmin, isSuperAdmin, isRoleListAllExist, isMember  } from "../middleware/roleVerify"

import { getAllUser, getUserById, getUser, createUser, updateUser,  deleteUser, login, loginWithGooleByCredential, logOut, signUp, refreshToken} from '../controllers/userController'

const router = Router()

router.get('/',[verifyToken, isMember], getAllUser)
router.get('/userInfo',[verifyToken, isMember], getUser)
router.get('/:id',[verifyToken, isMember], getUserById)
router.put('/:id',[verifyToken, isSuperAdmin, isRoleListAllExist], updateUser)
router.post('/',[verifyToken, isSuperAdmin, isRoleListAllExist], createUser) //要限定只有Admin以上才可以建立
router.delete('/:id',[verifyToken, isSuperAdmin], deleteUser)
router.post('/signUp', signUp)
router.post('/login', login)
router.post('/login/google/credential', loginWithGooleByCredential)
router.post('/logOut',[verifyToken], logOut)
router.post('/refreshToken', refreshToken)

export default router

