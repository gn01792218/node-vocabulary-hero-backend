import { PrismaClient } from '@prisma/client'
import { CreateSentenceRequest, UpdateSentenceRequest } from '../types/sentence'
const prisma = new PrismaClient()
export default class SentenceRepository{
    constructor(){
    }
    async create(exampleId:number, vocabularyId:number ,payload:CreateSentenceRequest){
        const sentence =await prisma.sentence.create({
            data:{
                en:payload.en,
                zh:payload.zh,
                exampleId:exampleId,
                vocabularyId:vocabularyId
            }
        })
        return sentence
    }
    async update(id:number, payload:UpdateSentenceRequest){
        const sentence = await prisma.sentence.update({
            where:{
                id
            },
            data:payload
        })
        return sentence
    }
    async delete(id:number){
        try{
            const deleteSentence = await prisma.sentence.delete({
                where:{ id }
            })
            return deleteSentence
        }catch(error){
            return console.log(error)
        }
    }
    async getAllIncludeExample(){
        return await prisma.sentence.findMany({include:{example:true}})
    }
    async getAllIncludeVocabulary(){
        return await prisma.sentence.findMany({include:{vocabulary:true}})
    }
    async getAllIncludeAll(){
        return await prisma.sentence.findMany({include:{example:true, vocabulary:true}})
    }
    async getAll(){
        return await prisma.sentence.findMany()
    }
    async getById(id:number){
        const sentence = await prisma.sentence.findUnique({where:{id}})
        if(!sentence) return null
        return sentence
    }
    async getByIdIncludeExample(id:number){
        const sentence = await prisma.sentence.findUnique({where:{id},include:{example:true}})
        if(!sentence) return null
        return sentence
    }
}