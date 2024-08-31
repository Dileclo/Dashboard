import { MongoDBclient, order, material } from "~/server/mongo"
import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
    const token = await getToken({ event })
    await MongoDBclient.connect()
    const body = await readBody(event)
    const body_parse = JSON.parse(body)
    const r = async () => {
        body_parse.bucket.forEach(element => {
            if (element.type == "Металлопрокат") {
                const total_length = Number(element.count) * (Number(element.length) / 1000)
            }
            const res = material.find({ 'auth': token?.email, 'thickness': element.thickness, 'color': element.color }).toArray()
            console.log(res)
        })
    }
    await order.insertOne({ ...body_parse, auth: token?.email })
    await MongoDBclient.close()
})