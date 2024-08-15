import { MongoDBclient, jobs } from "~/server/mongo"
import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
    const token = await getToken({ event })

    await MongoDBclient.connect()
    const body = await readBody(event)
    const body_parse = JSON.parse(body)
    const send = {
        ...body_parse.jobs,
        ...body_parse.route,
        auth:token?.email
    }
    try {
        await jobs.insertOne(send)
    } catch {

    } finally {
        await MongoDBclient.close()

    }

})