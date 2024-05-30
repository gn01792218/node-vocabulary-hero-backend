import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import route from '../../routes'
import serverless from 'serverless-http'

dotenv.config()

const app = express()
const port = 1222
app.use(cors())
app.use(express.json()) //讓express可以解析request.body

app.use(`${process.env.API_BASE_URL}`,route)

app.get('/',(req,res)=>{
    res.send('<h1>Hellow Word</h1>')
})
app.listen(port,()=>{
    console.log('server running at 1222')
})

export const handler = serverless(app)  //給部署到netlify使用