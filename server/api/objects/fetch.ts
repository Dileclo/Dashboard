import { MongoDBclient, objects } from "~/server/mongo"

export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    const res = await objects.find().toArray()
    await MongoDBclient.close()
    return { o: res }
})