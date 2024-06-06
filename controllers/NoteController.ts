import { Note } from '@prisma/client'
import NoteRepository from '../repositories/NoteRepository'
import VocabularyRepository from '../repositories/vocabularyRepository'
import { Request, Response } from 'express'
import { ErrorRespons } from '../types/error'
import { CreateNoteRequest, UpdateNoteRequest, UpdateNoteVocabularysRequest } from '../types/note'
const repo = new NoteRepository()
const vocabularyRepo = new VocabularyRepository()

export const getAllNotesIncludeVocabularyAndExample = async (req:Request,res:Response<Note[]>)=>{
    const notes = await repo.getAllIncludeVocabularyAndExample()
    console.log(notes)
    res.status(200).json(notes)
}
export const getNoteIncludeAllData = async (req:Request<{id:string}>,res:Response<Note | ErrorRespons>)=>{
    const note = await repo.getByIdIncludeAllData(Number(req.params.id))
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
export const updateNoteVocabulary = async (req:Request<{id:string}, never, UpdateNoteVocabularysRequest>,res:Response<Note | ErrorRespons>)=>{
    const payload = req.body
    payload.vocabularys_id = await getExistVocabularysId(payload.vocabularys_id)
    const note = await repo.updateVocabularys(Number(req.params.id) ,payload)
    console.log(note)
    res.status(200).json(note)
}
export const deleteNote = async (req:Request<{id:string}>,res:Response<Note | ErrorRespons>)=>{
    const note = await repo.delete(Number(req.params.id))
    if(!note) return res.status(400).json({message:"查無此Note物件"})
    console.log(note)
    res.status(200).json(note)
}

async function getExistVocabularysId(idList:number[]){
    const newList = await Promise.all(idList.map(checkVocabularyExist))
    return newList.filter((id) : id is number =>id !== null)
    //註解
    //(parameter): parameter is Type。在這裡，id is number 告訴 TypeScript 編譯器，當回調函數返回 true 時，id 的類型應該被認為是 number。
    //告訴 TypeScript 編譯器，過濾後的陣列只包含 number 類型的元素，從而避免了在後續代碼中對 id 進行不必要的空值檢查。
}
async function checkVocabularyExist(vocabularyId:number){
    const vocabulary = await vocabularyRepo.getById(vocabularyId)
    return vocabulary? vocabularyId : null
}