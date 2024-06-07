import { Vocabulary } from '@prisma/client'
import VocabularyRepository from '../repositories/vocabularyRepository'
import NoteRepository from '../repositories/NoteRepository'
import { Request, Response } from 'express'
import { VocabularyCreateFromNoteRequest, VocabularyCreateRequest, VocabularyUpdateRequest } from '../types/vocabulary'
import { ErrorRespons } from '../types/error'
const repo = new VocabularyRepository()
const noteRepo = new NoteRepository()

export const getAllVocabularys = async (req:Request,res:Response<Vocabulary[]>)=>{
    const roles = await repo.getAll()
    console.log(roles)
    res.status(200).json(roles)
}
export const getAllVocabularysIncludeUser = async (req:Request,res:Response<Vocabulary[]>)=>{
    const roles = await repo.getAllIncludeUser()
    console.log(roles)
    res.status(200).json(roles)
}
export const getAllVocabularysIncludeExampleAndStences = async (req:Request,res:Response<Vocabulary[]>)=>{
    const roles = await repo.getAllIncludeExamplesAndSentences()
    console.log(roles)
    res.status(200).json(roles)
}
export const getAllVocabularysAllRelationShip = async (req:Request,res:Response<Vocabulary[]>)=>{
    const roles = await repo.getAllIncludeAllRelationShip()
    console.log(roles)
    res.status(200).json(roles)
}
export const getVocabulary = async (req:Request<{id:string}>,res:Response<Vocabulary | ErrorRespons>)=>{
    const vocabulary = await repo.getById(Number(req.params.id))
    console.log(vocabulary)
    if(!vocabulary) return res.status(400).json({message:'查無此vocabulary'})
    res.status(200).json(vocabulary)
}
export const getVocabularyIncludeExamplesAndStences = async (req:Request<{id:string}>,res:Response<Vocabulary | ErrorRespons>)=>{
    const vocabulary = await repo.getByIdIncludeExampleAndStences(Number(req.params.id))
    console.log(vocabulary)
    if(!vocabulary) return res.status(400).json({message:'查無此vocabulary'})
    res.status(200).json(vocabulary)
}
export const createVocabularyByUser = async (req:Request<never, never, VocabularyCreateRequest>,res:Response<Vocabulary | ErrorRespons>)=>{
    if(!req.user?.id) return res.status(400).json({message:'需要使用者id'})
    const payload = req.body
    const vocabulary = await repo.createByUser(Number(req.user.id),payload)
    console.log(vocabulary)
    res.status(200).json(vocabulary)
}
export const createVocabularyByUserFromNote = async (req:Request<never, never, VocabularyCreateFromNoteRequest>,res:Response<Vocabulary | ErrorRespons>)=>{
    if(!req.user?.id) return res.status(400).json({message:'需要使用者id'})
    const payload = req.body
    const note = await noteRepo.getById(payload.noteId)
    if(!note) return res.status(400).json({message:"找不到該Note"})
    const vocabulary = await repo.createByUserFromNote(Number(req.user?.id),payload)
    console.log(vocabulary)
    res.status(200).json(vocabulary)
}
export const updateVocabulary = async (req:Request<{id:string}, never, VocabularyUpdateRequest>,res:Response<Vocabulary | ErrorRespons>)=>{
    const payload = req.body
    const vocabulary = await repo.update(Number(req.params.id) ,payload)
    console.log(vocabulary)
    res.status(200).json(vocabulary)
}
export const deleteVocabulary = async (req:Request,res:Response<Vocabulary | ErrorRespons>)=>{
    const { id } = req.params
    const vocabulary = await repo.delete(Number(id))
    if(!vocabulary) return res.status(400).json({message:"查無此單字物件"})
    console.log(vocabulary)
    res.status(200).json(vocabulary)
}