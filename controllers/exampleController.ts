import { Example } from '@prisma/client'
import ExampleRepository from '../repositories/exampleRepository'
import { Request, Response } from 'express'
import { ErrorRespons } from '../types/error'
import { CreateExampleRequest, UpdateExampleRequest } from '../types/example'
const repo = new ExampleRepository()

export const getAllExamplesIncludeSentence = async (req:Request,res:Response<Example[]>)=>{
    const examples = await repo.getAllIncludeSentence()
    console.log(examples)
    res.status(200).json(examples)
}
export const getAllExamplesIncludeVocabulary = async (req:Request,res:Response<Example[]>)=>{
    const examples = await repo.getAllIncludeVocabulary()
    console.log(examples)
    res.status(200).json(examples)
}
export const getExample = async (req:Request<{id:string}>,res:Response<Example | ErrorRespons>)=>{
    const example = await repo.getById(Number(req.params.id))
    console.log(example)
    if(!example) return res.status(400).json({message:'查無此example'})
    res.status(200).json(example)
}
export const createExampleByVocabulary = async (req:Request<{vocabularyId:string}, never, CreateExampleRequest>,res:Response<Example | ErrorRespons>)=>{
    if(!req.params.vocabularyId) return res.status(400).json({message:'需要vocabulary id'})
    const payload = req.body
    const example = await repo.createByVocabulary(Number(req.params.vocabularyId),payload)
    console.log(example)
    res.status(200).json(example)
}
export const updateExample = async (req:Request<{id:string}, never, UpdateExampleRequest>,res:Response<Example | ErrorRespons>)=>{
    const payload = req.body
    const example = await repo.update(Number(req.params.id) ,payload)
    console.log(example)
    res.status(200).json(example)
}
export const deleteExample = async (req:Request<{id:string}>,res:Response<Example | ErrorRespons>)=>{
    const example = await repo.delete(Number(req.params.id))
    if(!example) return res.status(400).json({message:"查無此單字物件"})
    console.log(example)
    res.status(200).json(example)
}