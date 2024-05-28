import { RefreshToken } from '@prisma/client'
import RefreshRepository from '../repositories/refreshTokenRepository'
import { UserRespons } from '../types/user'

const repo = new RefreshRepository()

export const getRefreshTokenById = async (id:number) =>{
    return await repo.getById(id)
}
export const getRefreshTokenByUserId = async (userId:number) =>{
    return await repo.getByUserId(userId)
}
export const getRefreshTokenByTokenIncludeUser = async (token:string) =>{
    return await repo.getByTokenIncludeUser(token)
}
export const createRefreshToken = async (userRespons:UserRespons)=>{
    const refreshToken = await repo.create(userRespons)
    return refreshToken
}
export const verifyRefreshTokenExpiration = (refreshToken:RefreshToken)=>{
    return refreshToken.expiryDate.getTime() < new Date().getTime()
}
export const deleteRefreshTokenById = async (id:number) =>{
    return await repo.delete(id)
}
export const deleteRefreshTokenByUserId = async (userId:number) =>{
    return await repo.deleteByUserId(userId)
}