import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
    // a) Never hardcode your secret in your code!! and b) use a secure secret, `test-123` is **not** secure!!
    secret: process.env.AUTH_SECRET ?? 'test-123',
    pages:{
        signIn:'/signin'
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
            authorize(credentials: any) {
                const user = { id: '1', name: 'J Smith', username: 'jsmith', password: 'hunter2' }
                console.log(credentials.email)
                // if (credentials?.username === user.username && credentials?.password === user.password) {
                //     // Any object returned will be saved in `user` property of the JWT
                //     return user
                // } else {
                //     console.error('Warning: Malicious login attempt registered, bad credentials provided')

                //     // If you return null then an error will be displayed advising the user to check their details.
                //     return null

                //     // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                // }
            }
        })
    ]
})