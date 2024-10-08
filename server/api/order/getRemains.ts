import { MongoDBclient, order, material } from "~/server/mongo"
import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
  const token = await getToken({ event })
  const body = await readBody(event)
  const body_parse = JSON.parse(body)
  await MongoDBclient.connect()
  let resp
  console.log("BODY", body_parse)
  console.log(body_parse.thickness)
  if (body_parse.type == "Металлопрокат") {
    const res = await material.find({ 'auth': token?.email, 'color': body_parse.color, 'thickness': body_parse.thickness }).toArray()
    console.log(res)
    resp = res.reduce((acc, current) => {
      return acc + Number(current.length)
    }, 0)
  } else {
    const res = await material.find({ 'auth': token?.email,'title': body_parse.title, 'color': body_parse.color }).toArray()
    resp = res.reduce((acc, current) => {
      return acc + Number(current.count)
    }, 0)
  }
  return { o: resp }

})