import { MongoDBclient, works } from "~/server/mongo"
import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
    const token = await getToken({ event })

    await MongoDBclient.connect()
    const body = await readBody(event)
    const r = await works.deleteOne({ 'name_work': JSON.parse(body).name_work, 'name_object': JSON.parse(body).name_object,'auth':token?.email})
})