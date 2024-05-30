import { Router } from 'express'
import { verifyToken  } from "../middleware/authJWT"
import { isMember } from "../middleware/roleVerify"

import { createExampleByVocabulary, deleteExample, getAllExamplesIncludeSentence, getAllExamplesIncludeVocabulary, getExample, updateExample } from '../controllers/exampleController'

const router = Router()

router.get('/',[verifyToken], getAllExamplesIncludeSentence)
router.get('/vocabulary',[verifyToken, isMember], getAllExamplesIncludeVocabulary)
router.get('/:id',[verifyToken, isMember], getExample)
router.post('/vocabulary/:vocabularyId',[verifyToken, isMember], createExampleByVocabulary) 
router.put('/:id',[verifyToken, isMember], updateExample)
router.delete('/:id',[verifyToken, isMember], deleteExample)

export default router

