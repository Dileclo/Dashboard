import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import { NuxtAuthHandler } from '#auth'
import { MongoDBclient, auth } from "~/server/mongo"
import bcrypt from "bcrypt"


export default NuxtAuthHandler({
    // a) Never hardcode your secret in your code!! and b) use a secure secret, `test-123` is **not** secure!!
    secret: process.env.AUTH_SECRET ?? 'test-123',
    pages: {
        signIn: '/signin'
    },
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        GithubProvider.default({
            clientId: 'Ov23li8LSMqOAvVd5uF8',
            clientSecret: '487331b1585f45d868c0606c6a65675412c954ac'
        }),
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        CredentialsProvider.default({
            name: 'Credentials',
            async authorize(credentials: any) {
                await MongoDBclient.connect()
                const user = await auth.findOne({ 'email': credentials.email })
                const isValid = await new Promise((resolve, reject) => {
                    bcrypt.compare(credentials.password, user.password, (err, res) => {
                        if (err) reject(err)
                        resolve(res)
                    })
                })
                console.log(credentials)
                if (credentials.email === user.email && isValid === true) {
                    return user
                } else {
                    console.error('Warning: Malicious login attempt registered, bad credentials provided')
                    return null
                }
            }
        })
    ]
})