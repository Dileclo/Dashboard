import { MongoDBclient, organization } from "~/server/mongo"

export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    const body = await readBody(event)
    console.log(body)
    const res = await organization.insertOne(body)
    return {
        body: JSON.stringify(res)
    }
})