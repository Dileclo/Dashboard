import { MongoDBclient, objects } from "~/server/mongo"

export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    const body = await readBody(event)
    const res = await objects.findOne({'name_object':body})
    await MongoDBclient.close()
    return { o: res }
})