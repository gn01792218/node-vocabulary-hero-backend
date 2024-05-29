import { Router } from 'express'
import { verifyToken  } from "../middleware/authJWT"
import { isMember } from "../middleware/roleVerify"

import { createExampleByVocabulary, deleteExample, getAllExamplesIncludeSentence, getAllExamplesIncludeVocabulary, getExample, updateExample } from '../controllers/exampleController'

const router = Router()

router.get('/examples',[verifyToken], getAllExamplesIncludeSentence)
router.get('/examples/vocabulary',[verifyToken, isMember], getAllExamplesIncludeVocabulary)
router.get('/examples/:id',[verifyToken, isMember], getExample)
router.post('/examples/vocabulary/:vocabularyId',[verifyToken, isMember], createExampleByVocabulary) 
router.put('/examples/:id',[verifyToken, isMember], updateExample)
router.delete('/examples/:id',[verifyToken, isMember], deleteExample)

export default router

