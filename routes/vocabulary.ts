import { Router } from 'express'
import { verifyToken  } from "../middleware/authJWT"
import { isMember } from "../middleware/roleVerify"

import { 
    createVocabularyByUser, 
    createVocabularyByUserFromNote,
    deleteVocabulary, 
    getAllVocabularys, 
    getAllVocabularysIncludeUser, 
    getAllVocabularysIncludeExampleAndStences,
    getAllVocabularysAllRelationShip,
    getVocabulary, 
    getVocabularyIncludeExamplesAndStences,
    updateVocabulary 
} from '../controllers/vocabularyController'

const router = Router()

router.get('/',[verifyToken], getAllVocabularys)
router.get('/user',[verifyToken, isMember], getAllVocabularysIncludeUser)
router.get('/examples',[verifyToken, isMember], getAllVocabularysIncludeExampleAndStences)
router.get('/all', [verifyToken, isMember], getAllVocabularysAllRelationShip)
router.get('/:id',[verifyToken, isMember], getVocabulary)
router.get('/:id/examples/stences',[verifyToken, isMember], getVocabularyIncludeExamplesAndStences)
router.post('/user',[verifyToken, isMember], createVocabularyByUser) 
router.post('/note',[verifyToken, isMember], createVocabularyByUserFromNote)
router.put('/:id',[verifyToken, isMember], updateVocabulary)
router.delete('/:id',[verifyToken, isMember], deleteVocabulary)

export default router

