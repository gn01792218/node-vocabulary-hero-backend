import { Router } from 'express'

import { getAllUser, getUser, createUser, updateUser,  deleteUser, login} from '../controllers/userController'

const router = Router()

router.get('/users', getAllUser)
router.get('/users/:id', getUser)
router.post('/users', createUser)  //signUp也是用這個
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)
router.post('/users/login', login)

export default router

