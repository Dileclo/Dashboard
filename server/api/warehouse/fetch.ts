import { MongoDBclient, warehouse } from "~/server/mongo"
import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
  await MongoDBclient.connect()
  const token = await getToken({ event })
  const res = await warehouse.find({ 'auth': token?.email }).toArray()
  await MongoDBclient.close()
  return { o: res }
})
