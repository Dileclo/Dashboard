import { MongoDBclient, objects } from "~/server/mongo"
import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
    const token = await getToken({ event })

    await MongoDBclient.connect()
    const body = await readBody(event)
    console.log(body)
    const res = await objects.findOne({'name_object':body,'auth':token?.email})
    return { o: res }
})