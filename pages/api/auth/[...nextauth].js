import { MongoDBAdapter } from "../../../lib/mongodb-adapter/dist";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../lib/dbClientPromise";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.JWT_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: "/",
    signOut: "/",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token, user }) {
      const userData = await MongoDBAdapter(clientPromise).getUserByEmail(
        session.user.email
      );
      session.user.id = userData.id;
      token.id = userData.id;
      session.user.username = userData.username;
      token.username = userData.username;
      return session;
    },
  },
  debug: true,
});
