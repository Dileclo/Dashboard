import { MongoDBclient, organization } from "~/server/mongo"

export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    const body = JSON.parse(await readBody(event))
    const res = await organization.insertOne(body)
    return {
        body: JSON.stringify(res)
    }
})