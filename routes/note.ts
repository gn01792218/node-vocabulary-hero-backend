import { Router } from 'express'
import { verifyToken  } from "../middleware/authJWT"
import { isMember } from "../middleware/roleVerify"

import { createNoteByUser, 
    deleteNote, 
    getAllNotesIncludeVocabularyAndExample, 
    getNoteIncludeAllData, 
    updateNote,
    updateNoteVocabulary
 } from '../controllers/NoteController'

const router = Router()

router.get('/',[verifyToken], getAllNotesIncludeVocabularyAndExample)
router.get('/:id',[verifyToken, isMember], getNoteIncludeAllData)
router.post('/user',[verifyToken, isMember], createNoteByUser) 
router.put('/:id/vocabularys',[verifyToken, isMember], updateNoteVocabulary)
router.put('/:id',[verifyToken, isMember], updateNote)
router.delete('/:id',[verifyToken, isMember], deleteNote)

export default router

