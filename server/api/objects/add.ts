import { MongoDBclient, objects } from "~/server/mongo"
import { getToken } from '#auth'
export default defineEventHandler(async (event) => {
    const token = await getToken({ event })

    await MongoDBclient.connect()
    const body = await readBody(event)
    const ar = JSON.parse(body)
    const res = {
        name_object:ar.name_object,
        zastroyshik:ar.zastroyshik,
        address:ar.address,
        lico_os_str:ar.lico_os_str,
        lico_os_proekt:ar.lico_os_proekt,
        auth:token?.email
    }
    const resp = await objects.insertOne(res)
    await MongoDBclient.close()
    return {
        body: JSON.stringify(resp)
    }

})