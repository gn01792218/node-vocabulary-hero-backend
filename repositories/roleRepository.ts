import { RoleCreateDTO, RoleUpdateRequest } from '../types/role'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default class UserRepository{
    constructor(){
    }
    async add(payload:RoleCreateDTO){
        const role =await prisma.role.create({
            data:payload
        })
        return role
    }
    async update(id:number, payload:RoleUpdateRequest){
        const role = await prisma.role.update({
            where:{
                id
            },
            data:payload
        })
        return role
    }
    async delete(id:number){
        const deleteRole = await prisma.role.delete({
            where:{ id }
        })
        return deleteRole
    }
    async getAll(){
        return await prisma.role.findMany()
    }
    async getById(id:number){
        const role = await prisma.role.findUnique({where:{id}})
        if(!role) return null
        return role
    }
    async getByName(name:string){
        const role = await prisma.role.findUnique({where:{name}})
        if(!role) return null
        return role
    }
}