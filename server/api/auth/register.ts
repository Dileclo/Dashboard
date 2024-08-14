import { MongoDBclient, auth } from "~/server/mongo"
import bcrypt from "bcrypt"
export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    const body = await readBody(event)

    const password = JSON.parse(body).password

    const hash = await new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) reject(err)
            resolve(hash)
        })
    })

    
    try {
        if (await auth.findOne({ 'email': JSON.parse(body).email })) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Email already exists' 
            })
        } else {
            await auth.insertOne({ ...JSON.parse(body), password: hash })
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'User added successfully' })
            }
        }
    } catch {

    } finally {
        await MongoDBclient.close()

    }
})