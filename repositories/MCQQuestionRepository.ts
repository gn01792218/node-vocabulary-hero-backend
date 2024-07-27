import { MCQQuestionCreateRequest, MCQQuestionUpdateRequest } from '../types/MCQQuestion'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default class testPaperRepository{
    constructor(){
    }
    async add(user_id:number,payload:MCQQuestionCreateRequest){  
        const data =await prisma.mCQQuestion.create({
            data:{
                question:payload.question,
                solutions:payload.solutions,
                share:payload.share,
                tags:payload.tags,
                user_id,
                options:{
                    create:[...payload.options]
                },
                test_papers:{
                    connect:[
                        {
                            id:payload.test_paper_id
                        }
                    ]
                }
            }   
        })
        return data
    }
    async update(id:number, payload:MCQQuestionUpdateRequest){
        const data = await prisma.mCQQuestion.update({
            where:{
                id
            },
            data:payload
        })
        return data
    }
    async delete(id:number){
        const deleteData = await prisma.mCQQuestion.delete({
            where:{ id }
        })
        return deleteData
    }
    async getAll(){
        return await prisma.mCQQuestion.findMany({include:{options:true}})
    }
    async getById(id:number){
        const data = await prisma.mCQQuestion.findUnique({where:{id},include:{options:true}})
        if(!data) return null
        return data
    }
}