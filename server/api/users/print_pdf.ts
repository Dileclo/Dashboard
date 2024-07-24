import { MongoDBclient, users, attendanse } from "~/server/mongo"
import useDayjs from 'dayjs';
import 'dayjs/locale/ru';

export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    const user = await attendanse.find().toArray()
    const att = await attendanse.find().toArray()
    const dayjs = useDayjs;
    dayjs.locale('ru');
    console.log(dayjs().daysInMonth())
})