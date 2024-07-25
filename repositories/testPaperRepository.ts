import { TestPaperCreateRequest, TestPaperUpdateRequest } from '../types/testPaper'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default class testPaperRepository{
    constructor(){
    }
    async add(payload:TestPaperCreateRequest){  
        const testPaper =await prisma.testPaper.create({
            data:payload    
        })
        return testPaper
    }
    async update(id:number, payload:TestPaperUpdateRequest){
        const testPaper = await prisma.testPaper.update({
            where:{
                id
            },
            data:payload
        })
        return testPaper
    }
    async delete(id:number){
        const deletetestPaper = await prisma.testPaper.delete({
            where:{ id }
        })
        return deletetestPaper
    }
    async getAll(){
        return await prisma.testPaper.findMany()
    }
    async getById(id:number){
        const testPaper = await prisma.testPaper.findUnique({where:{id}})
        if(!testPaper) return null
        return testPaper
    }
}