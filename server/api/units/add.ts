import { MongoDBclient, units } from "~/server/mongo"

export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    const body = await readBody(event)
    try {
        const check = await units.findOne(JSON.parse(body))
        if (check){
            setResponseStatus(event,400)
        }else{
            return await units.insertOne(JSON.parse(body))
        }
    } catch {

    } finally {
        await MongoDBclient.close()

    }

})