import { MongoDBclient, order, material } from "~/server/mongo"
import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
  const token = await getToken({ event })
  const body = await readBody(event)
  const body_parse = JSON.parse(body)
  await MongoDBclient.connect()
  const res = await material.find({ 'auth': token?.email, 'title': body_parse.title, 'color': body_parse.color }).toArray()
  const resp = res.reduce((acc, current) => {
    return acc + Number(current.count)
  }, 0)
  console.log(resp)
  return { o: resp }

})