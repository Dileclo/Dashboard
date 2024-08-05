import { MongoDBclient, objects } from "~/server/mongo"

export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    const body = await readBody(event)
    console.log(body)
    const res = await objects.findOne({'name_object':body})
    return { o: res }
})