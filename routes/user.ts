import { Router } from 'express'
import { verifyToken } from "../middleware/authJWT"

import { getAllUser, getUser, createUser, updateUser,  deleteUser, login} from '../controllers/userController'

const router = Router()

router.get('/users',[verifyToken], getAllUser)
router.get('/users/:id',[verifyToken], getUser)
router.post('/users',[verifyToken], createUser) //要限定只有Admin以上才可以建立
router.put('/users/:id',[verifyToken], updateUser)
router.delete('/users/:id',[verifyToken], deleteUser)
router.post('/users/signUp', createUser) //暫時和createUser用同一個
router.post('/users/login', login)

export default router

