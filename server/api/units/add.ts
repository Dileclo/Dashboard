import { MongoDBclient, units } from "~/server/mongo"
import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
    const token = await getToken({ event })

    await MongoDBclient.connect()
    const body = await readBody(event)
    try {
        const check = await units.findOne(JSON.parse(body))
        if (check){
            setResponseStatus(event,400)
        }else{
            return await units.insertOne({...JSON.parse(body),'auth':token?.email})
        }
    } catch {

    } finally {
        await MongoDBclient.close()

    }

})