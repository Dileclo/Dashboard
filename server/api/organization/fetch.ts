import { MongoDBclient, organization } from "~/server/mongo"

export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    const res = await organization.find().toArray()
    const ret = await res.json()
    return {body:ret}
})