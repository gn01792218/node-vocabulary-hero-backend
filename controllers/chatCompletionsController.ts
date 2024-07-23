import { Example } from '@prisma/client'
import ChatCompletionRepository from '../repositories/chatCompletions'
import { Request, Response } from 'express'
import OpenAI from 'openai'

const repo = new ChatCompletionRepository()
const openai = new OpenAI()

export const chatComplete = async (req:Request,res:Response<OpenAI.Chat.ChatCompletion>)=>{
    const completion = await openai.chat.completions.create({
        messages:[{
            role:"user",
            content:"幫我用attain、attest這兩個單字出多益的閱讀選擇題"
        }],
        model:'gpt-3.5-turbo'
    })
    console.log(completion)
    res.status(200).json(completion)
}