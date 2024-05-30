import { Router } from 'express'
import { verifyToken  } from "../middleware/authJWT"
import { isMember } from "../middleware/roleVerify"

import { 
    createVocabularyByUser, 
    deleteVocabulary, 
    getAllVocabularys, 
    getAllVocabularysIncludeUser, 
    getVocabulary, 
    getVocabularyIncludeExamplesAndStences,
    updateVocabulary 
} from '../controllers/vocabularyController'

const router = Router()

router.get('/',[verifyToken], getAllVocabularys)
router.get('/user',[verifyToken, isMember], getAllVocabularysIncludeUser)
router.get('/:id',[verifyToken, isMember], getVocabulary)
router.get('/:id/examples/stences',[verifyToken, isMember], getVocabularyIncludeExamplesAndStences)
router.post('/user/:userId',[verifyToken, isMember], createVocabularyByUser) 
router.put('/:id',[verifyToken, isMember], updateVocabulary)
router.delete('/:id',[verifyToken, isMember], deleteVocabulary)

export default router

