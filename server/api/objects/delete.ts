import { MongoDBclient, objects } from "~/server/mongo"

export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    const b = JSON.parse(await readBody(event))
    await objects.deleteOne({ "name_object": b.name_object, "address": b.address })
    return {
        body: JSON.stringify("Nice")
    }
})