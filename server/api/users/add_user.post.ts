import { MongoDBclient, users } from "~/server/mongo"

export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    const body = await readBody(event)
    if (await users.findOne({ phone: body.phone })){
        return false
    }
    await users.insertOne(body)
    await MongoDBclient.close()
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "User added successfully" }),
    }
})