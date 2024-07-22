import { MongoDBclient, users, attendanse } from "~/server/mongo"

export default defineEventHandler(async (event) => {
    await MongoDBclient.connect();
    const body = await readBody(event);

    try {
        const userList = await users.find({}).toArray();
        const attendanceList = await attendanse.find({ date: body.date }).toArray();

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
