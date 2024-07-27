import { TestPaper } from '@prisma/client'
import TestPaperRepository from '../repositories/testPaperRepository'
import { Request, Response } from 'express'
import { ErrorRespons } from '../types/error'
import { TestPaperCreateRequest, TestPaperUpdateRequest } from '../types/testPaper'
const repo = new TestPaperRepository()

export const getAll = async (req:Request,res:Response<TestPaper[]>)=>{
    const res_data = await repo.getAll()
    console.log(res_data)
    res.status(200).json(res_data)
}
export const getById = async (req:Request<{id:string}>,res:Response<TestPaper | ErrorRespons>)=>{
    const res_data = await repo.getById(Number(req.params.id))
    console.log(res_data)
    if(!res_data) return res.status(400).json({message:'查無此試卷'})
    res.status(200).json(res_data)
}
export const create = async (req:Request<never, never, TestPaperCreateRequest>,res:Response<TestPaper | ErrorRespons>)=>{
    if(!req.user?.id) return res.status(400).json({message:'需要使用者id'})
    const payload = req.body
    const res_data = await repo.add(Number(req.user.id),{...payload})
    console.log(res_data)
    res.status(200).json(res_data)
}
export const update = async (req:Request<{id:string}, never, TestPaperUpdateRequest>,res:Response<TestPaper | ErrorRespons>)=>{
    const payload = req.body
    const res_data = await repo.update(Number(req.params.id) ,payload)
    console.log(res_data)
    res.status(200).json(res_data)
}
export const deleteById = async (req:Request,res:Response<TestPaper | ErrorRespons>)=>{
    const { id } = req.params
    const res_data = await repo.delete(Number(id))
    console.log(res_data)
    res.status(200).json(res_data)
}