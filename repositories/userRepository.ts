import { RoleEnum } from '../types/role'
import { UserCreateDTO, UserUpdateRequest } from '../types/user'
import { PrismaClient, Role } from '@prisma/client'
const prisma = new PrismaClient()
export default class UserRepository{
    constructor(){
    }
    async add(payload:UserCreateDTO){
        const user =await prisma.user.create({
            data:{
                ...payload,
                roles:{
                    connect:[ //往roles裡面push一個Role
                        {name:"MEMBER"},
                    ]
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
                    connect:this.converRoleEnumIntoRole(payload.rolesEnum)
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
            return { name: roleEnum }
        })
    }
}