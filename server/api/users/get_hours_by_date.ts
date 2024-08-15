import { MongoDBclient, users, attendanse} from "~/server/mongo"
import useDayjs from 'dayjs';
import { getToken } from '#auth'

import 'dayjs/locale/ru';
const dayjs = useDayjs;
dayjs.locale('ru');

const getDayOfMonth = (month, dateString) => {
    const date = dayjs(dateString);
    return date.month() === month ? date.date() : null;
};

export default defineEventHandler(async (event) => {
    const token = await getToken({ event })
    
    await MongoDBclient.connect();
    const body = await readBody(event);
    const currentMonth = dayjs(body).month();
    const attendance = await attendanse.find({'auth':token?.email}).toArray();
    const userList = await users.find({'auth':token?.email}).toArray();

    // Создаем объект для быстрого поиска полного имени по номеру телефона
    const userMap = userList.reduce((map, user) => {
        map[user.phone] = user.fullname;
        return map;
    }, {});

    const combined = attendance.reduce((acc, attr) => {
        const day = getDayOfMonth(currentMonth, attr.date);
        if (day !== null) {
            const phone = attr.phone;
            if (!acc[phone]) {
                acc[phone] = { phone, fullname: userMap[phone] };
            }
            acc[phone][day] = attr.hoursWorked;
        }
        return acc;
    }, {});

    const result = Object.values(combined);
    console.log(result);
    return result;
});