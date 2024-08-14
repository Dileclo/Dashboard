import { MongoDBclient,users } from "~/server/mongo"

export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    console.log(await readBody(event))
    const u = await users.find().toArray()
    await MongoDBclient.close()
    return {users:u}
})