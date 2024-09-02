import { MongoDBclient, order, material } from "~/server/mongo";
import { getToken } from "#auth";

export default defineEventHandler(async (event) => {
  const token = await getToken({ event });
  await MongoDBclient.connect();
  const body = await readBody(event);
  const body_parse = JSON.parse(body);
  body_parse.bucket.forEach((element) => {
    console.log(element);
    if (element.type == "Металлопрокат") {
      const total_length =
        Number(element.count) * (Number(element.length) / 1000);
      console.log(total_length);

      const res = material.updateOne(
        {
          auth: token?.email,
          thickness: element.thickness,
          color: element.color,
        },
        { $inc: { length: -total_length } },
        { upsert: true }
      );
    }
  });
  await order.insertOne({ ...body_parse, auth: token?.email });
  await MongoDBclient.close();
});
