import { MongoDBclient, works } from "~/server/mongo"
import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
    const token = await getToken({ event })

    await MongoDBclient.connect()
    const body = await readBody(event)
    console.log(body)
    const res = await works.find({"name_object":JSON.parse(body),'auth':token?.email}).toArray()
    console.log(res)
    return { o: res }
})