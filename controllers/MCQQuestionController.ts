import { MCQQuestion } from '@prisma/client'
import MCQQuestionRepository from '../repositories/MCQQuestionRepository'
import { Request, Response } from 'express'
import { ErrorRespons } from '../types/error'
import { MCQQuestionCreateRequest, MCQQuestionUpdateRequest } from '../types/MCQQuestion'
const repo = new MCQQuestionRepository()

export const getAll = async (req:Request,res:Response<MCQQuestion[]>)=>{
    const res_data = await repo.getAll()
    console.log(res_data)
    res.status(200).json(res_data)
}
export const getById = async (req:Request<{id:string}>,res:Response<MCQQuestion | ErrorRespons>)=>{
    const res_data = await repo.getById(Number(req.params.id))
    console.log(res_data)
    if(!res_data) return res.status(400).json({message:'查無此選擇題'})
    res.status(200).json(res_data)
}
export const create = async (req:Request<never, never, MCQQuestionCreateRequest>,res:Response<MCQQuestion | ErrorRespons>)=>{
    if(!req.user?.id) return res.status(400).json({message:'需要使用者id'})
    const payload = req.body
    const res_data = await repo.add(Number(req.user.id),{...payload})
    console.log(res_data)
    res.status(200).json(res_data)
}
export const update = async (req:Request<{id:string}, never, MCQQuestionUpdateRequest>,res:Response<MCQQuestion | ErrorRespons>)=>{
    const payload = req.body
    const res_data = await repo.update(Number(req.params.id) ,payload)
    console.log(res_data)
    res.status(200).json(res_data)
}
export const deleteById = async (req:Request,res:Response<MCQQuestion | ErrorRespons>)=>{
    const { id } = req.params
    const res_data = await repo.delete(Number(id))
    console.log(res_data)
    res.status(200).json(res_data)
}