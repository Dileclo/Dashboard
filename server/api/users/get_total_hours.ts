import { MongoDBclient,users,attendanse } from "~/server/mongo"

export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    const u = await users.find().toArray()
    const att = await attendanse.find().toArray()
    const hoursWorkedByUser = att.reduce((acc, entry) => {
        const phone = entry.phone.toString();
        const hoursWorked = parseFloat(entry.hoursWorked); // Преобразуем строку в число
        if (!acc[phone]) {
            acc[phone] = { phone: phone, hoursWorked: 0 };
        }
        acc[phone].hoursWorked += hoursWorked;
        return acc;
    }, {});

    // Преобразуем результат обратно в массив для удобства
    const result = Object.values(hoursWorkedByUser);
    console.log(result)
    return {users:u}
})