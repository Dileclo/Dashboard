import { MongoDBclient, nomenclature } from "~/server/mongo"
import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
  const token = await getToken({ event })

  await MongoDBclient.connect()
  const body = await readBody(event)
  await nomenclature.insertOne({ ...JSON.parse(body), auth: token?.email })
  await MongoDBclient.close()
})