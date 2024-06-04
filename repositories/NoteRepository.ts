import { PrismaClient } from '@prisma/client'
import { CreateNoteRequest, UpdateNoteRequest } from '../types/note'
const prisma = new PrismaClient()
export default class NoteGroupRepository{
    constructor(){
    }
    async createByUser(userId:number ,payload:CreateNoteRequest){
        const note =await prisma.note.create({
            data:{
                title:payload.title,
                description:payload.description,
                userId
            }
        })
        return note
    }
    async update(id:number, payload:UpdateNoteRequest){
        const note = await prisma.note.update({
            where:{
                id
            },
            data:payload
        })
        return note
    }
    async delete(id:number){
        try{
            const deletenote = await prisma.note.delete({
                where:{ id }
            })
            return deletenote
        }catch(error){
            return console.log(error)
        }
    }
    async getAllIncludeVocabulary(){
        return await prisma.note.findMany({include:{vocabularys:true}})
    }
    async getByIdIncludeVocabulary(id:number){
        const note = await prisma.note.findUnique({where:{id},include:{vocabularys:true}})
        if(!note) return null
        return note
    }
}