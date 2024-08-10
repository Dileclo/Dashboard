import { MongoDBclient, jobs } from "~/server/mongo"

export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    const body = await readBody(event)
    const body_parse = JSON.parse(body)
    const send = {
        ...body_parse.jobs,
        ...body_parse.route
    }
    try {
        await jobs.insertOne(send)
    } catch {

    } finally {
        await MongoDBclient.close()

    }

})