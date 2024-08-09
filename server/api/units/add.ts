import { MongoDBclient, units } from "~/server/mongo"

export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    const body = await readBody(event)
    console.log(body)
    const res = await units.insertOne(body)
    await MongoDBclient.close()
    return { o: res }
})