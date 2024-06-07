import { VocabularyCreateFromNoteRequest, VocabularyCreateRequest, VocabularyUpdateNotesRequest, VocabularyUpdateRequest } from '../types/vocabulary'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default class VocabularyRepository{
    constructor(){
    }
    async createByUser(userId:number ,payload:VocabularyCreateRequest){
        const vocabulary =await prisma.vocabulary.create({
            data:{
                spelling:payload.spelling,
                pronunciation:payload.pronunciation,
                userId:userId
            }
        })
        return vocabulary
    }
    async createByUserFromNote(userId:number ,payload:VocabularyCreateFromNoteRequest){
        const vocabulary =await prisma.vocabulary.create({
            data:{
                spelling:payload.spelling,
                pronunciation:payload.pronunciation,
                userId:userId,
                notes:{
                    connect:[
                        {
                            id:payload.noteId
                        }
                    ]
                }
            }
        })
        return vocabulary
    }
    async update(id:number, payload:VocabularyUpdateRequest){
        const vocabulary = await prisma.vocabulary.update({
            where:{
                id
            },
            data:payload
        })
        return vocabulary
    }
    async delete(id:number){
        try{
            const deleteVocabulary = await prisma.vocabulary.delete({
                where:{ id }
            })
            return deleteVocabulary
        }catch(error){
            return console.log(error)
        }
    }
    async getAll(){
        return await prisma.vocabulary.findMany()
    }
    async getAllIncludeUser(){
        return await prisma.vocabulary.findMany({include:{user:true}})
    }
    async getAllIncludeExamplesAndSentences(){
        return await prisma.vocabulary.findMany({include:{user:true, examples:{include:{sentences:true}}}})
    }
    async getAllIncludeAllRelationShip(){
        return await prisma.vocabulary.findMany({include:{user:true, examples:{include:{sentences:true}}, notes:true}})
    }
    async getById(id:number){
        const vocabulary = await prisma.vocabulary.findUnique({where:{id}})
        if(!vocabulary) return null
        return vocabulary
    }
    async getByIdIncludeExampleAndStences(id:number){
        const vocabulary = await prisma.vocabulary.findUnique({where:{id},include:{examples:{include:{sentences:true}}}})
        if(!vocabulary) return null
        return vocabulary
    }
}