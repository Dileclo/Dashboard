import { MongoDBclient, users, attendanse } from "~/server/mongo"
import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    const body = await readBody(event)
    const token = await getToken({ event })

    const record = await attendanse.findOne({ 'phone': body.row.phone, 'date': body.date,'auth':token?.email })
    console.log(record)
    if (record) {
        console.log("Nice")
        await attendanse.updateOne(
            { phone: body.row.phone, date: body.date,'auth':token?.email },
            { $set: { hoursWorked: body.hoursWorked } },
            { upsert: true }
        )
    }else{
        console.log("Bad")
        await attendanse.insertOne({'phone':body.row.phone, 'date': body.date, 'hoursWorked': body.hoursWorked,'auth':token?.email})
    }
    const resp = await attendanse.find({date:body.date}).toArray()
    await MongoDBclient.close()
    return { success: true ,data:resp}
})
