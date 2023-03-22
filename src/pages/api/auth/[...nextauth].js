import NextAuth from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import clientPromise from "@lib/mongodb"
import Account from "@models/account/Account"

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Access key",
      credentials: {
        accessKey: { label: "Access key", type: "text" },
        secretKey: { label: "Secret key", type: "text" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { accessKey, secretKey } = credentials
        const user = accessKey
          ? await Account.findOne({ "accountKeys.accountAccessKey": accessKey })
          : secretKey ? await Account.findOne({ "accountKeys.accountSecretKey": secretKey }) : null

        return user ? user : null
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      session.user = { id: token.id };
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
      }
      return token
    },
  }
})

