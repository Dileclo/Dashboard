import { MongoDBclient, order,material } from "~/server/mongo"
import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
    const token = await getToken({ event })
    await MongoDBclient.connect()
    const body = await readBody(event)
    const body_parse = JSON.parse(body)
    await order.insertOne({ ...body_parse, auth: token?.email })
    await MongoDBclient.close()
})