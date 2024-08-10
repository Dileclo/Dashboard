import { MongoDBclient, units } from "~/server/mongo"

export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    const res = await units.find().toArray()
    await MongoDBclient.close()
    const resp = res.map((un) => {
        return { label: un.unit }
    })
    return { o: resp }
})