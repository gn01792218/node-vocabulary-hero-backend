import { RoleEnum } from '../types/role'
import { UserCreateRequest, UserUpdateRequest } from '../types/user'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default class UserRepository{
    constructor(){
    }
    async add(payload:UserCreateRequest){
        const user =await prisma.user.create({
            data:{
                name:payload.name,
                email:payload.email,
                password:payload.password,
                provider:payload.provider,
                roles:{
                    //使用connect才不會新增一個role，而是尋找既有的role然後加進去; 因此若找不到會報錯
                    connect: this.converRoleEnumIntoRole(payload.rolesEnum || [])
                }
            },
            include:{
                roles:true
            }
        })
        return user
    }
    async update(id:number, payload:UserUpdateRequest){
        const user = await prisma.user.update({
            where:{
                id
            },
            data:{
                name:payload.name,
                email:payload.email,
                password:payload.password,
                provider:payload.provider,
                roles:{
                    set:this.converRoleEnumIntoRole(payload.rolesEnum) //使用set來複寫
                }
            },
            include:{
                roles:true
            }
        })
        return user
    }
    async delete(id:number){
        const deleteUser = await prisma.user.delete({
            where:{ id },
            include:{
                roles:true
            }
        })
        return deleteUser
    }
    async getAll(){
        return await prisma.user.findMany({
            include:{
                roles:true
            }
        })
    }
    async getById(id:number){
        const user = await prisma.user.findUnique({
            where:{id},
            include:{
                roles:true
            }
        })
        if(!user) return null
        return user
    }
    async getByEmail(email:string){
        const user = await prisma.user.findUnique({
            where:{email},
            include:{
                roles:true
            }
        })
        if(!user) return null
        return user
    }
    private converRoleEnumIntoRole(rolesEnum: RoleEnum[]) {
        return rolesEnum.map(roleEnum => {
            return { name: roleEnum.toUpperCase() }
        })
    }
}