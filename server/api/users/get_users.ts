import { MongoDBclient,users } from "~/server/mongo"

export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    const u = await users.find().toArray()
    await MongoDBclient.close()
    return {users:u}
})