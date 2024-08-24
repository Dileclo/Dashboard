import { MongoDBclient, warehouse } from "~/server/mongo"
import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
  const token = await getToken({ event })
  await MongoDBclient.connect()
  const body = await readBody(event)
  console.log(body)
  const body_parse = JSON.parse(body)
  await warehouse.insertOne({ ...body_parse, auth: token?.email })
  await MongoDBclient.close()
})
