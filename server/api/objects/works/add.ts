import { MongoDBclient, works } from "~/server/mongo"

export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    const body = await readBody(event)
    console.log(body)
    const res = await works.insertOne(JSON.parse(body))
})