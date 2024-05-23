import { User } from '@prisma/client'
import UserRepository from '../repositories/userRepository'
import { Request, Response } from 'express'
import { UserCreateRequest, UserLoginRequest, UserUpdateRequest } from '../types/user'
import bcrypt from 'bcryptjs'
import { ErrorRespons } from '../types/error'

const userRepo = new UserRepository()

export const getAllUser = async (req:Request,res:Response<User[]>)=>{
    const users = await userRepo.getAll()
    console.log(users)
    res.status(200).json(users)
}
export const getUser = async (req:Request<{id:string}>,res:Response<User | ErrorRespons>)=>{
    const user = await userRepo.getById(Number(req.params.id))
    console.log(user)
    if(!user) return res.status(400).json({message:"查無此User"})
    res.status(200).json(user)
}
export const createUser = async (req:Request<never, never, UserCreateRequest>,res:Response<User | ErrorRespons>)=>{
    const payload = req.body
    if(await isThisEmailExist(payload.email)) return res.status(400).send({message:"此email已經存在!"}) //1.檢查email有沒有重複
    if(payload.confirmPassword !== payload.password) return res.status(400).send({message:"密碼與確認密碼不同!"}) //2.檢查確認密碼
    const user = await userRepo.add({
        name:payload.name,
        email:payload.email,
        password:await bcryptPassword(payload.password),
        provider:payload.provider
    })
    console.log(user)
    res.status(200).json(user)
}
export const updateUser = async (req:Request<{id:string}, never, UserUpdateRequest>,res:Response<User | ErrorRespons>)=>{
    const payload = req.body
    if(! await isThisUserExist(Number(req.params.id))) return res.status(400).send({message:"找不到此user"})
    payload.password = await bcryptPassword(payload.password) //加密密碼
    const user = await userRepo.update(Number(req.params.id) ,payload)
    console.log(user)
    res.status(200).json(user)
}
export const deleteUser = async (req:Request,res:Response<User | ErrorRespons>)=>{
    const { id } = req.params
    if(! await isThisUserExist(Number(id))) return res.status(400).send({message:'沒有此User'})
    const user = await userRepo.delete(Number(id))
    console.log(user)
    res.status(200).json(user)
}
export const login = async (req:Request<never, never, UserLoginRequest>, res:Response<string | ErrorRespons>)=>{
    const payload = req.body
    const user = await userRepo.getByEmail(payload.email)
    if(!user) return res.status(400).send({message:'找不到該使用者'})
    if(!await passwordCompare(payload.password, user.password)) return res.status(400).send({message:"密碼不正確!"})
    return res.status(200).send("<h1>登入成功</h1>") 
}

//內部方法
async function isThisEmailExist(email:string){
    const user = await userRepo.getByEmail(email)
    if(!user) return false
    return true
}
async function isThisUserExist(id:number){
    const user = await userRepo.getById(id)
    if(!user) return false
    return true
}
async function bcryptPassword(password:string){
    return await bcrypt.hash(password, 12)
}
async function passwordCompare(inputPassword:string, comparePassword:string){
    return await bcrypt.compare(inputPassword, comparePassword)
}