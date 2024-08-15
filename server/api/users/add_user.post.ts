import { MongoDBclient, users } from "~/server/mongo"
import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
    const token = await getToken({ event })

    await MongoDBclient.connect()
    const body = await readBody(event)
    if (await users.findOne({ phone: body.phone,'auth':token?.email })){
        return false
    }
    await users.insertOne(body)
    await MongoDBclient.close()
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "User added successfully" }),
    }
})