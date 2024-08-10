import { MongoDBclient, jobs } from "~/server/mongo"
import useDayjs from 'dayjs';
import 'dayjs/locale/ru';
const dayjs = useDayjs;
dayjs.locale('ru');
export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    const body = await readBody(event)
    const body_parse = await JSON.parse(body)
    const res = await jobs.find({id:body_parse.id,name_work:body_parse.name_work}).toArray()
    const resp = res.map(job => {
        return {
            ...job,
            unit: job.unit.label,
            date:dayjs(job.date).format("YYYY-MM-DD HH:mm")
        }
    })
    console.log(resp)
    await MongoDBclient.close()
    return { o: resp }
})