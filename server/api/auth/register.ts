import { MongoDBclient, auth } from "~/server/mongo"
import bcrypt from "bcrypt"
export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    const body = await readBody(event)
    
    const password = JSON.parse(body).password

    const hash = await new Promise((resolve,reject)=>{
        bcrypt.hash(password,10,(err,hash)=>{
            if (err) reject(err)
            resolve(hash)
        })
    })

    const isValid = await new Promise((resolve,reject)=>{
        bcrypt.compare(password,hash,(err,res)=>{
            if(err) reject(err)
            resolve(res)
        })
    })


    console.log(hash, isValid)

    await MongoDBclient.close()
})