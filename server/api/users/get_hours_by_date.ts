import { MongoDBclient, users, attendanse } from "~/server/mongo"
import useDayjs from 'dayjs';
import 'dayjs/locale/ru';

export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    const att = await attendanse.find({}).toArray()
    att.forEach(attr => {
        attr.day = getDayOfMonth(attr.date)
    })
    const hour = att.reduce((acc, hour) => {
        const phone = hour.phone.toString()
        const date = hour.day.toString()
        console.log(acc)
        return acc
    })
    return att
})

function getDayOfMonth(st) {
    const dayjs = useDayjs;
    dayjs.locale('ru');
    const date = dayjs(st)
    const dayOfMonth = date.date()
    return dayOfMonth
}