import { MongoDBclient, objects } from "~/server/mongo"

export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    const body = await readBody(event)
    const res = await objects.insertOne(body)
    await MongoDBclient.close()
    return {
        body: JSON.stringify(res)
    }

})