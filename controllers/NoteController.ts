import { Note } from '@prisma/client'
import NoteRepository from '../repositories/NoteRepository'
import { Request, Response } from 'express'
import { ErrorRespons } from '../types/error'
import { CreateNoteRequest, UpdateNoteRequest } from '../types/note'
const repo = new NoteRepository()

export const getAllNotesIncludeVocabulary = async (req:Request,res:Response<Note[]>)=>{
    const notes = await repo.getAllIncludeVocabulary()
    console.log(notes)
    res.status(200).json(notes)
}
export const getNote = async (req:Request<{id:string}>,res:Response<Note | ErrorRespons>)=>{
    const note = await repo.getByIdIncludeVocabulary(Number(req.params.id))
    console.log(note)
    if(!note) return res.status(400).json({message:'查無此Note'})
    res.status(200).json(note)
}
export const createNoteByUser = async (req:Request<never, never, CreateNoteRequest>,res:Response<Note | ErrorRespons>)=>{
    if(!req.user?.id) return res.status(400).json({message:'需要user id'})
    const payload = req.body
    const note = await repo.createByUser(Number(req.user.id),payload)
    console.log(note)
    res.status(200).json(note)
}
export const updateNote = async (req:Request<{id:string}, never, UpdateNoteRequest>,res:Response<Note | ErrorRespons>)=>{
    const payload = req.body
    const note = await repo.update(Number(req.params.id) ,payload)
    console.log(note)
    res.status(200).json(note)
}
export const deleteNote = async (req:Request<{id:string}>,res:Response<Note | ErrorRespons>)=>{
    const note = await repo.delete(Number(req.params.id))
    if(!note) return res.status(400).json({message:"查無此Note物件"})
    console.log(note)
    res.status(200).json(note)
}