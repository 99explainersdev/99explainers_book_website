import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/connectDB";
import { User } from "../../../../models/User";
import { Collection } from "mongodb";

const handler = NextAuth({
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const db = await connectDB();
        const userCollection: Collection<User> = db.collection("users"); // Correct type definition
        const user = await userCollection.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("User not found");
        }

        // Return the user object with the required fields
        return {
          id: user._id?.toString(), // Ensure _id is converted to string
          name: user.name,
          email: user.email,
          role: user.role, // ✅ Ensure role is passed
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
      const db = await connectDB();
      const userCollection: Collection<User> = db.collection("users"); // Use the User type here

      if (account?.provider === "google" && user.email) {
        const existingUser = await userCollection.findOne({
          email: user.email,
        });

        if (!existingUser) {
          await userCollection.insertOne({
            email: user.email,
            name: user.name ?? undefined, // ✅ Ensure it's either string or undefined
            image: user.image ?? undefined, // ✅ Handle possible null values
            provider: account.provider,
            role: "user", // Default role
          });
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || "user"; // ✅ Ensure role is stored
      } else {
        const db = await connectDB();
        const existingUser = await db
          .collection<User>("users") // Use the User type here
          .findOne({ email: token.email });

        if (existingUser) {
          token.role = existingUser.role; // ✅ Fetch role from DB
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.user.role = token.role; // ✅ Ensure role is in session
      return session;
    },

    async redirect({ url, baseUrl, token }) {
      if (token?.role === "admin") {
        return "/admin-dashboard";
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
});

export { handler as GET, handler as POST };
