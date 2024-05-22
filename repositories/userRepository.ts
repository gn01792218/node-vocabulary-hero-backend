import { UserCreateDTO, UserUpdateRequest } from '../types/user'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default class UserRepository{
    constructor(){
    }
    async add(payload:UserCreateDTO){
        const user =await prisma.user.create({
            data:payload
        })
        return user
    }
    async update(id:number, payload:UserUpdateRequest){
        const user = await prisma.user.update({
            where:{
                id
            },
            data:payload
        })
        return user
    }
    async delete(id:number){
        const deleteUser = await prisma.user.delete({
            where:{ id }
        })
        return deleteUser
    }
    async getAll(){
        return await prisma.user.findMany()
    }
    async getById(id:number){
        const user = await prisma.user.findUnique({where:{id}})
        if(!user) return null
        return user
    }
    async getByEmail(email:string){
        const user = await prisma.user.findUnique({where:{email}})
        if(!user) return null
        return user
    }
}