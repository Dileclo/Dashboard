import { MongoDBclient, objects } from "~/server/mongo"
import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
    const token = await getToken({ event })

    await MongoDBclient.connect()
    const b = JSON.parse(await readBody(event))
    await objects.deleteOne({ "name_object": b.name_object, "address": b.address ,"auth":token?.email})
    return {
        body: JSON.stringify("Nice")
    }
})