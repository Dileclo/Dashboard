import { MongoDBclient, auth } from "~/server/mongo"
export default defineEventHandler(async (event) => {
    const bcrypt = require('bcrypt');
    await MongoDBclient.connect()
    const body = await readBody(event)
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(JSON.parse(body).password, salt, function (err, hash) {
            console.log(hash)
        });
    });
    await MongoDBclient.close()
})