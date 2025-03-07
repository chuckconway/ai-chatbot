import NextAuth, {type DefaultSession, User} from 'next-auth'

import GitHub from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'


declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's id. */
      id: string
    } & DefaultSession['user']
  }
}

const credentialProvider = CredentialsProvider({
  // The name to display on the sign in form (e.g. "Sign in with...")
  name: "Credentials",
  // `credentials` is used to generate a form on the sign in page.
  // You can specify which fields should be submitted, by adding keys to the `credentials` object.
  // e.g. domain, username, password, 2FA token, etc.
  // You can pass any HTML attribute to the <input> tag through the object.
  credentials: {
    username: { label: "Username", type: "text", placeholder: "jsmith" },
    password: { label: "Password", type: "password" }
  },
  async authorize(credentials, req) {
    // Add logic here to look up the user from the credentials supplied
    const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

    return user

    // if (user) {
    //   // Any object returned will be saved in `user` property of the JWT
    //   return user
    // } else {
    //   // If you return null then an error will be displayed advising the user to check their details.
    //   return null
    //
    //   // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
    // }
  }
})


export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  providers: [credentialProvider],
  // callbacks: {
  //   jwt({ token, profile }) {
  //     if (profile) {
  //       token.id = profile.id
  //       token.image = profile.avatar_url || profile.picture
  //     }
  //     return token
  //   },
  //   session: ({ session, token }) => {
  //     if (session?.user && token?.id) {
  //       session.user.id = String(token.id)
  //     }
  //     return session
  //   },
  //   authorized({ auth }) {
  //     return !!auth?.user // this ensures there is a logged in user for -every- request
  //   }
  // },
  // pages: {
  //   signIn: '/sign-in' // overrides the next-auth default signin page https://authjs.dev/guides/basics/pages
  // }
})
