import { MongoDBclient, users, attendanse } from "~/server/mongo"

export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    const body = await readBody(event)

    try {
        const userList = await users.find({}).toArray()
        await MongoDBclient.close()
        await MongoDBclient.connect()

        const attendanceList = await attendanse.find({ 'date': body.date }).toArray()
        await MongoDBclient.close()

        const combinedData = userList.map(user => {
            const userAttendance = attendanceList.find(att => att.phone.toString() === user.phone.toString())
            return {
                ...user,
                is_present: userAttendance ? userAttendance.is_present : false
            }

        })
        return combinedData
    } catch (e) {
        console.error(e)
    } finally {
        await MongoDBclient.close()

    }
})
