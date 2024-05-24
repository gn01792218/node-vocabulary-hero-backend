import { Role } from '@prisma/client'
import RoleRepository from '../repositories/roleRepository'
import { Request, Response } from 'express'
import { RoleCreateRequest, RoleEnum, RoleUpdateRequest } from '../types/role'
import { ErrorRespons } from '../types/error'
const repo = new RoleRepository()

export const getAllRoles = async (req:Request,res:Response<Role[]>)=>{
    const roles = await repo.getAll()
    console.log(roles)
    res.status(200).json(roles)
}
export const getRole = async (req:Request<{id:string}>,res:Response<Role | ErrorRespons>)=>{
    const role = await repo.getById(Number(req.params.id))
    console.log(role)
    if(!role) return res.status(400).json({message:'查無此role'})
    res.status(200).json(role)
}
export const createRole = async (req:Request<never, never, RoleCreateRequest>,res:Response<Role | ErrorRespons>)=>{
    const payload = req.body
    if(await isRoleNameExist(payload.name)) return res.status(400).send({message:"此role name已經存在"})
    const role = await repo.add({
       name:payload.name
    })
    console.log(role)
    res.status(200).json(role)
}
export const updateRole = async (req:Request<{id:string}, never, RoleUpdateRequest>,res:Response<Role | ErrorRespons>)=>{
    const payload = req.body
    if(! await isRoleExist(Number(req.params.id))) return res.status(400).send({message:'此Role不存在'})
    const role = await repo.update(Number(req.params.id) ,payload)
    console.log(role)
    res.status(200).json(role)
}
export const deleteRole = async (req:Request,res:Response<Role | ErrorRespons>)=>{
    const { id } = req.params
    if(! await isRoleExist(Number(id))) return res.status(400).send({message:'此Role不存在'})
    const user = await repo.delete(Number(id))
    console.log(user)
    res.status(200).json(user)
}

export const checkRolesEnumAllExist = async (rolesEnum:RoleEnum[])=>{
    const roles = await repo.getAll()
    return rolesEnum.every(roleEnum=>{
        return roles.some(role=>role.name.toUpperCase() === roleEnum.toUpperCase())
    })
}

async function isRoleNameExist(name:string){
    const role = await repo.getByName(name)
    if(!role) return false
    return true
}
async function isRoleExist(id:number){
    const role = await repo.getById(id)
    if(!role) return false
    return true
}