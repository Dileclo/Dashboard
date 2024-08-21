import { MongoDBclient, material } from "~/server/mongo"
import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
    const token = await getToken({ event })

    await MongoDBclient.connect()
    const res = await material.find({'auth':token?.email}).toArray()
    
    return { o: res }
})