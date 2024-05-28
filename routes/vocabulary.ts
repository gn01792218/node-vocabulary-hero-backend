import { Router } from 'express'
import { verifyToken  } from "../middleware/authJWT"
import { isMember } from "../middleware/roleVerify"

import { createVocabularyByUser, deleteVocabulary, getAllVocabularys, getAllVocabularysIncludeUser, getVocabulary, updateVocabulary } from '../controllers/vocabularyController'

const router = Router()

router.get('/vocabularys',[verifyToken], getAllVocabularys)
router.get('/vocabularys/user',[verifyToken, isMember], getAllVocabularysIncludeUser)
router.get('/vocabularys/:id',[verifyToken, isMember], getVocabulary)
router.post('/vocabularys/user/:userId',[verifyToken, isMember], createVocabularyByUser) 
router.put('/vocabularys/:id',[verifyToken, isMember], updateVocabulary)
router.delete('/vocabularys/:id',[verifyToken, isMember], deleteVocabulary)

export default router

