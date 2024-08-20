import { MongoDBclient, order } from "~/server/mongo"
import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
    const token = await getToken({ event })
    await MongoDBclient.connect()
    const body = await readBody(event)
    const res = await order.findOne({ 'auth': token?.email, 'order_id': Number(body) })

    await MongoDBclient.close()
    return { o: res }
})