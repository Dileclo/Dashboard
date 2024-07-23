import { MongoDBclient, users, attendanse } from "~/server/mongo"

export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    const body = await readBody(event)
    
    const record = await attendanse.findOne({ 'phone': body.row.phone, 'date': body.date })
    console.log(record)
    if (record) {
        console.log("Nice")
        await attendanse.updateOne(
            { phone: body.row.phone, date: body.date },
            { $set: { hoursWorked: body.hoursWorked } },
            { upsert: true }
        )
    }else{
        console.log("Bad")
        await attendanse.insertOne({'phone':body.row.phone, 'date': body.date, 'hoursWorked': body.hoursWorked})
    }
    const resp = await attendanse.find({date:body.date}).toArray()
    await MongoDBclient.close()
    return { success: true ,data:resp}
})
