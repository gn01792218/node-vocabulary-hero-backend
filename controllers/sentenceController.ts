import { Sentence } from '@prisma/client'
import SentenceRepository from '../repositories/sentenceRepository'
import { Request, Response } from 'express'
import { ErrorRespons } from '../types/error'
import { CreateSentenceRequest, UpdateSentenceRequest } from '../types/sentence'
const repo = new SentenceRepository()

export const getAllSentences = async (req:Request,res:Response<Sentence[]>)=>{
    const sentences = await repo.getAll()
    console.log(sentences)
    res.status(200).json(sentences)
}
export const getSentents = async (req:Request<{id:string}>,res:Response<Sentence | ErrorRespons>)=>{
    const sentence = await repo.getById(Number(req.params.id))
    console.log(sentence)
    if(!sentence) return res.status(400).json({message:'查無此sentence'})
    res.status(200).json(sentence)
}
export const getSententsIncludeExample = async (req:Request<{id:string}>,res:Response<Sentence | ErrorRespons>)=>{
    const sentence = await repo.getByIdIncludeExample(Number(req.params.id))
    console.log(sentence)
    if(!sentence) return res.status(400).json({message:'查無此sentence'})
    res.status(200).json(sentence)
}
export const createSentence = async (req:Request<{exampleId:string, vocabularyId:string}, never, CreateSentenceRequest>,res:Response<Sentence | ErrorRespons>)=>{
    if(!req.params.exampleId) return res.status(400).json({message:'需要example id'})
    if(!req.params.vocabularyId) return res.status(400).json({message:'需要vocabulary id'})
    const payload = req.body
    const sentence = await repo.create(Number(req.params.exampleId),Number(req.params.vocabularyId),payload)
    console.log(sentence)
    res.status(200).json(sentence)
}
export const updateSentence = async (req:Request<{id:string}, never, UpdateSentenceRequest>,res:Response<Sentence | ErrorRespons>)=>{
    const payload = req.body
    const sentence = await repo.update(Number(req.params.id) ,payload)
    console.log(sentence)
    res.status(200).json(sentence)
}
export const deleteSentence = async (req:Request<{id:string}>,res:Response<Sentence | ErrorRespons>)=>{
    const sentence = await repo.delete(Number(req.params.id))
    if(!sentence) return res.status(400).json({message:"查無此例句物件"})
    console.log(sentence)
    res.status(200).json(sentence)
}