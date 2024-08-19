import { MongoDBclient, customer } from "~/server/mongo"
import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
    const token = await getToken({ event })
    await MongoDBclient.connect()
    const body = JSON.parse(await readBody(event))

    const existingCustomer = await customer.findOne({ 'phone': body.phone, 'auth': token?.email })
    if (existingCustomer) {
        setResponseStatus(event, 400)
        return // останавливаем выполнение функции
    }

    await customer.insertOne({ ...body, auth: token?.email })
    setResponseStatus(event, 200)
})