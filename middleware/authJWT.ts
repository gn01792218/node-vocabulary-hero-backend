import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from "express"
import { ErrorRespons } from '../types/error'
import { authSecret } from "../config/auth"
import { UserModel } from '../types/user'

//用來為每一隻API驗證Token的function
export const verifyToken = (req:Request,res:Response<ErrorRespons>,next:NextFunction)=>{
    const token = req.headers["authorization"]?.replace('Bearer ','') as string

    if(!token) return res.status(403).send({message:"No Access Token Provided!"})
    if(!authSecret) return res.status(403).send({message:"No Auth Secret Provided!"})
    jwt.verify(token, authSecret,(err,decoded)=>{
    if(err) return catchJWTError(err, res) 
    req.user = decoded as UserModel
    next()
    })
}

function catchJWTError(err:jwt.VerifyErrors,res:Response<ErrorRespons>){
    if(err instanceof jwt.TokenExpiredError) return res.status(401).send({message:"Access token was expired!"})
    return res.status(401).send({message:"Unauthorized!"})
}