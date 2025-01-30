import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/connectDB";

interface User {
  _id: string;
  email: string;
  password?: string;
  name?: string;
  image?: string;
  role: string;
  provider?: string;
}

const authOptions: AuthOptions = {
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // session duration (in seconds)
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const db: Db = await connectDB();
        const currentUser = await db
          .collection<User>("users")
          .findOne({ email: credentials.email });

        if (!currentUser || !currentUser.password) {
          return null;
        }

        // Removed bcrypt code for password validation

        return {
          id: currentUser._id,
          email: currentUser.email,
          name: currentUser.name,
          role: currentUser.role,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user, account }) {
      const db: Db = await connectDB();
      const userCollection = db.collection<User>("users");

      if (account?.provider === "google" && user.email) {
        const existingUser = await userCollection.findOne({
          email: user.email,
        });

        if (!existingUser) {
          await userCollection.insertOne({
            email: user.email,
            name: user.name,
            image: user.image,
            provider: account.provider,
            role: "user",
          });
        }
      }

      return true;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = (user as User).role;
      }
      return token;
    },

    async redirect({ url, baseUrl, token }) {
      if (token?.role === "admin") {
        return "/admin-dashboard";
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
