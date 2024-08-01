import { MongoDBclient, organization } from "~/server/mongo"

export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    const body = await readBody(event)
    const res = await organization.insertOne(body)
    await MongoDBclient.close()
    return {
        body: JSON.stringify(res)
    }
    
})