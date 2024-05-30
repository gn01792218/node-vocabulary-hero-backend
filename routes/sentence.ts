import { Router } from 'express'
import { verifyToken  } from "../middleware/authJWT"
import { isMember } from "../middleware/roleVerify"

import { createSentence, deleteSentence, getAllSentences, getSentents, getSententsIncludeExample, updateSentence } from '../controllers/sentenceController'

const router = Router()

router.get('/',[verifyToken], getAllSentences)
router.get('/:id',[verifyToken, isMember], getSentents)
router.get('/:id/example',[verifyToken, isMember], getSententsIncludeExample)
router.post('/:exampleId/:vocabularyId',[verifyToken, isMember], createSentence) 
router.put('/:id',[verifyToken, isMember], updateSentence)
router.delete('/:id',[verifyToken, isMember], deleteSentence)

export default router

