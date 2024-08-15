import { MongoDBclient, users, attendanse } from "~/server/mongo"
import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
    const token = await getToken({ event })

    await MongoDBclient.connect();
    const body = await readBody(event);

    try {
        const userList = await users.find({'auth':token?.email}).toArray();
        const attendanceList = await attendanse.find({ date: body.date,'auth':token?.email }).toArray();

        const combinedData = userList.map(user => {
            const userAttendance = attendanceList.find(att => att.phone.toString() === user.phone.toString());
            return {
                ...user,
                hoursWorked: userAttendance ? userAttendance.hoursWorked : 0
            };
        });

        return combinedData;
    } catch (e) {
        console.error(e);
        throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
    } finally {
        await MongoDBclient.close();
    }
});
