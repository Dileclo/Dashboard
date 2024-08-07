import { MongoDBclient, works } from "~/server/mongo"

export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    const body = await readBody(event)
    console.log(body)
    const res = await works.find({"name_object":JSON.parse(body)}).toArray()
    console.log(res)
    return { o: res }
})