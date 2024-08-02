import { MongoDBclient, objects } from "~/server/mongo"

export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    const body = await readBody(event)
    const ar = JSON.parse(body)
    console.log(ar.zastroyshik.inn)
    const res = await objects.insertOne(body)
    await MongoDBclient.close()
    return {
        body: JSON.stringify(res)
    }

})