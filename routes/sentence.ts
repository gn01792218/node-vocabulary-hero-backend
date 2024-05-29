import { Router } from 'express'
import { verifyToken  } from "../middleware/authJWT"
import { isMember } from "../middleware/roleVerify"

import { createSentence, deleteSentence, getAllSentences, getSentents, getSententsIncludeExample, updateSentence } from '../controllers/sentenceController'

const router = Router()

router.get('/sentences',[verifyToken], getAllSentences)
router.get('/sentences/:id',[verifyToken, isMember], getSentents)
router.get('/sentences/:id/example',[verifyToken, isMember], getSententsIncludeExample)
router.post('/sentences/:exampleId/:vocabularyId',[verifyToken, isMember], createSentence) 
router.put('/sentences/:id',[verifyToken, isMember], updateSentence)
router.delete('/sentences/:id',[verifyToken, isMember], deleteSentence)

export default router

