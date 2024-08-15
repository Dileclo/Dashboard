import { MongoDBclient,users } from "~/server/mongo"
import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
    const token = await getToken({ event })

    await MongoDBclient.connect()
    const body =  JSON.parse( await readBody(event))
    await users.deleteOne({"phone":body.phone,"auth":token?.email})
    await MongoDBclient.close()
    return{
        statusCode: 200,
        body: JSON.stringify({ message: "User deleted successfully" }),
    }

})