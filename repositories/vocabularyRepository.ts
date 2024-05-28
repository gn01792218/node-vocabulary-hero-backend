import { VocabularyCreateRequest, VocabularyUpdateRequest } from '../types/vocabulary'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default class UserRepository{
    constructor(){
    }
    async createByUser(payload:VocabularyCreateRequest){
        const vocabulary =await prisma.vocabulary.create({
            data:{
                spelling:payload.spelling,
                zh:payload.zh,
                pronunciation:payload.prounciation,
                userId:payload.userId
            }
        })
        return vocabulary
    }
    async update(id:number, payload:VocabularyUpdateRequest){
        const vocabulary = await prisma.role.update({
            where:{
                id
            },
            data:payload
        })
        return vocabulary
    }
    async delete(id:number){
        const deleteVocabulary = await prisma.vocabulary.delete({
            where:{ id }
        })
        return deleteVocabulary
    }
    async getAll(){
        return await prisma.vocabulary.findMany()
    }
    async getAllIncludeUser(){
        return await prisma.vocabulary.findMany({include:{user:true}})
    }
    async getById(id:number){
        const vocabulary = await prisma.vocabulary.findUnique({where:{id}})
        if(!vocabulary) return null
        return vocabulary
    }
}