import { MongoDBclient, organization } from "~/server/mongo"
import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
    const token = await getToken({ event })

    await MongoDBclient.connect()
    const body = await readBody(event)
    const res = await organization.insertOne({...body,"auth":token?.email})
    await MongoDBclient.close()
    return {
        body: JSON.stringify(res)
    }
    
})