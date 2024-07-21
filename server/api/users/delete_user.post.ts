import { MongoDBclient,users } from "~/server/mongo"

export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    const body =  JSON.parse( await readBody(event))
    await users.deleteOne({"phone":body.phone})
    await MongoDBclient.close()
    return{
        statusCode: 200,
        body: JSON.stringify({ message: "User deleted successfully" }),
    }

})