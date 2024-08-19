import { MongoDBclient, customer } from "~/server/mongo"
import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
    const token = await getToken({ event })
    await MongoDBclient.connect()
    const r = await customer.find({'auth':token?.email}).toArray()
    const d = r.map((c) => {
        if (c.label){
            return { ...c , label: c.label + ' ' + c.phone}
        }else{
            return{...c,label:c.surname+' '+c.name+' '+c.phone}
        }
    })
    console.log(d)
    return {resp:d}
})