import { MongoDBclient, works } from "~/server/mongo"

export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    const res = await works.find({}).toArray()
    return { o: res }
})