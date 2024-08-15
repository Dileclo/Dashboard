import { MongoDBclient, organization } from "~/server/mongo"
import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
    const token = await getToken({ event })

    await MongoDBclient.connect()
    const res = await organization.find().toArray()
    return {
        body: JSON.stringify(res)
    }
})