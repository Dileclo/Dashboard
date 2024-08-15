import { MongoDBclient, units } from "~/server/mongo"
import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
    const token = await getToken({ event })

    await MongoDBclient.connect()
    const res = await units.find({'auth':token?.email}).toArray()
    await MongoDBclient.close()
    const resp = res.map((un) => {
        return { label: un.unit }
    })
    return { o: resp }
})