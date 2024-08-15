import { MongoDBclient,users } from "~/server/mongo"
import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    const token = await getToken({event})
    const u = await users.find({'auth':token?.email}).toArray()
    console.log(u)
    await MongoDBclient.close()
    return {users:u}
})