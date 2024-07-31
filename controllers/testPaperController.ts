import { TestPaper } from '@prisma/client'
import TestPaperRepository from '../repositories/testPaperRepository'
import MCQRepository from '../repositories/MCQQuestionRepository'
import { Request, Response } from 'express'
import { ErrorRespons } from '../types/error'
import { TestPaperCreateRequest, TestPaperUpdateRequest, UpdateTestPaperMCQsRequest } from '../types/testPaper'
const repo = new TestPaperRepository()
const MCQRepo = new MCQRepository()

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
export const updateTestPaperMCQs = async (req:Request<{id:string}, never, UpdateTestPaperMCQsRequest>,res:Response<TestPaper | ErrorRespons>)=>{
    const payload = req.body
    payload.ids = await getExistIds(payload.ids)
    const data = await repo.updateMCQs(Number(req.params.id) ,payload)
    console.log(data)
    res.status(200).json(data)
}
export const deleteById = async (req:Request,res:Response<TestPaper | ErrorRespons>)=>{
    const { id } = req.params
    const res_data = await repo.delete(Number(id))
    console.log(res_data)
    res.status(200).json(res_data)
}
async function getExistIds(idList:number[]){
    const newList = await Promise.all(idList.map(checkIdExist))
    return newList.filter((id) : id is number =>id !== null)
    //註解
    //(parameter): parameter is Type。在這裡，id is number 告訴 TypeScript 編譯器，當回調函數返回 true 時，id 的類型應該被認為是 number。
    //告訴 TypeScript 編譯器，過濾後的陣列只包含 number 類型的元素，從而避免了在後續代碼中對 id 進行不必要的空值檢查。
}
async function checkIdExist(id:number){
    const data = await MCQRepo.getById(id)
    return data? id : null
}