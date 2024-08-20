import { MongoDBclient, order } from "~/server/mongo"
import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
    const token = await getToken({ event })
    await MongoDBclient.connect()
    const last_id = await order.find({'auth':token?.email}).sort({_id:-1}).limit(1).toArray()
    await MongoDBclient.close()
    return last_id
})