import { PrismaClient } from '@prisma/client'
import { refreshTokenExpiration, timeBase } from "../config/auth"
import { randomUUID } from 'crypto'
import { UserRespons } from '../types/user'

const prisma = new PrismaClient()

export default class RefreshTokenRepository{
    constructor(){
    }
    async create(payload:UserRespons){
        //1.制定過期時間 ( 從當下開始+設定的時間 )
        const expiredAt = new Date()
        expiredAt.setSeconds(expiredAt.getSeconds() + refreshTokenExpiration * timeBase)
        //2.製作refreshToken，存進DB
        const token = randomUUID()
        const refreshToken = await prisma.refreshToken.create({
            data:{
                token,
                expiryDate:expiredAt,
                userId:payload.id,
            }
        })
        return refreshToken.token
    }
    async getById(id:number){
        return await prisma.refreshToken.findUnique({where:{id}})
    }
    async getByUserId(userId:number){
        return await prisma.refreshToken.findUnique({where:{userId}})
    }
    async getByTokenIncludeUser(token:string){
        return await prisma.refreshToken.findUnique({ where:{ token }, include:{ user:true } })
    }
    async delete(id:number){
        return await prisma.refreshToken.delete({where:{id}})
    }
    async deleteByUserId(userId:number){ //為了給更新、刪除使用者的時候使用
        return await prisma.refreshToken.delete({where:{userId}})
    }
}