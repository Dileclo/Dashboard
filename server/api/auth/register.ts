import { MongoDBclient, auth } from "~/server/mongo"

export default defineEventHandler(async (event) => {
    await MongoDBclient.connect()
    const body = await readBody(event)
    const body_parse = JSON.parse(body)
    const user = await auth.findOne({ username: body_parse.username })
    if (user && user.password === body_parse.password) {
        return {
            body: JSON.stringify({ message: "User authenticated successfully" })
        }
    } else {
        return {
            body: JSON.stringify({ message: "Invalid username or password" })
        }
    }
    await MongoDBclient.close()
    return { body: JSON.stringify({ message: "An error occurred" }) }
})