import { MongoDBclient, order } from "~/server/mongo"
import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
    const token = await getToken({ event })

    await MongoDBclient.connect()
    const body = await readBody(event)
    const body_parse = JSON.parse(body)
    console.log(body_parse)
    const res = await order.updateOne({ 'auth': token?.email, 'order_id': Number(body_parse.order_id) }, { $set: { 'status': body_parse.status } })
    await MongoDBclient.close()
    return { o: res }
})