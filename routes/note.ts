import { Router } from 'express'
import { verifyToken  } from "../middleware/authJWT"
import { isMember } from "../middleware/roleVerify"

import { createNoteByUser, deleteNote, getAllNotesIncludeVocabulary, getNote, updateNote } from '../controllers/NoteController'

const router = Router()

router.get('/',[verifyToken], getAllNotesIncludeVocabulary)
router.get('/:id',[verifyToken, isMember], getNote)
router.post('/user',[verifyToken, isMember], createNoteByUser) 
router.put('/:id',[verifyToken, isMember], updateNote)
router.delete('/:id',[verifyToken, isMember], deleteNote)

export default router

