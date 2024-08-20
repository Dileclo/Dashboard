import { MongoDBclient, order } from "~/server/mongo"
import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
    const token = await getToken({ event })
    await MongoDBclient.connect()
    const res = await order.find({ 'auth': token?.email }).toArray()

    await MongoDBclient.close()
    return { o: res }
})