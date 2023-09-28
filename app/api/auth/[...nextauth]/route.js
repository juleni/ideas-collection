import User from "@models/user";
import { connectToDB } from "@utils/database";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        // check if a user already exists
        const userExists = await User.findOne({ email: profile.email });
        // if not, create a new user
        if (!userExists) {
          const avatar = profile.picture ? profile.picture : profile.avatar_url;
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: avatar,
          });
        }
        return true;
      } catch (error) {
        console.log("SignIn error: " + error);
        return true;
      }
    },
  },
});

export { handler as GET, handler as POST };
