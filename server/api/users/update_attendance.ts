import { MongoDBclient, users, attendanse } from "~/server/mongo"

export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    const body = await readBody(event)
    console.log(body)
    const record = await attendanse.findOne({ 'phone': body.row.phone, 'date': body.date })
    if (record) {
        await attendanse.updateOne({ 'phone': body.row.phone, 'date': body.date }, { "$set": { "is_present": body.value } })
    }else{
        await attendanse.insertOne({ 'phone': body.row.phone, 'date': body.date,'is_present': body.value})
    }
    await MongoDBclient.close()

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "User added successfully" }),
    }
})