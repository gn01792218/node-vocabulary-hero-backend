import { CreateExampleRequest, UpdateExampleRequest } from '../types/example'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default class ExampleRepository{
    constructor(){
    }
    async createByVocabulary(vocabularyId:number ,payload:CreateExampleRequest){
        const example =await prisma.example.create({
            data:{
                definition:payload.definition,
                vocabularyId:vocabularyId
            }
        })
        return example
    }
    async update(id:number, payload:UpdateExampleRequest){
        const example = await prisma.example.update({
            where:{
                id
            },
            data:payload
        })
        return example
    }
    async delete(id:number){
        try{
            const deleteExample = await prisma.example.delete({
                where:{ id }
            })
            return deleteExample
        }catch(error){
            return console.log(error)
        }
    }
    async getAllIncludeSentence(){
        return await prisma.example.findMany({include:{sentences:true}})
    }
    async getAllIncludeVocabulary(){
        return await prisma.example.findMany({include:{vocabulary:true}})
    }
    async getAllIncludeAll(){
        return await prisma.example.findMany({include:{vocabulary:true, sentences:true}})
    }
    async getById(id:number){
        const example = await prisma.example.findUnique({where:{id}})
        if(!example) return null
        return example
    }
}