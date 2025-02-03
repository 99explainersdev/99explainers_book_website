import NextAuth from "next-auth"; //NextAuth: The core library for handling authentication in Next.js.
import CredentialsProvider from "next-auth/providers/credentials"; //CredentialsProvider: A provider for handling email/password-based authentication.
import GoogleProvider from "next-auth/providers/google"; //GoogleProvider: A provider for handling Google OAuth-based authentication.
import { connectDB } from "@/lib/connectDB"; //connectDB: A utility function to connect to the MongoDB database.
import { User } from "../../../../models/User"; //User: A TypeScript interface or type representing the user model.
import { Collection } from "mongodb"; //Collection: A type from MongoDB representing a collection in the database.



const handler = NextAuth({
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET, //secret: A secret key used to encrypt session data. It is fetched from the environment variables.

  session: {
    strategy: "jwt", //strategy: "jwt": Uses JSON Web Tokens (JWT) for session management.
    maxAge: 30 * 24 * 60 * 60, // maxAge: Sets the session's maximum age to 30 days (in seconds).
  },

  providers: [
    CredentialsProvider({
      credentials: { // credentials: Defines the fields required for authentication (email and password).
        email: {},
        password: {},
      },
      async authorize(credentials) { //authorize: A function that validates the credentials and returns the user object if valid.
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const db = await connectDB();
        if (!db) {
          throw new Error("Database connection failed");
        }
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
    signIn: "/login", //signIn: Redirects users to the /login page for authentication.
  },

  callbacks: {
    async signIn({ user, account }) {
      const db = await connectDB();
      if (!db) {
        throw new Error("Database connection failed");
      }
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
        token.role = (user as User).role || "user"; 
      } else {
        const db = await connectDB();
        if (!db) {
          throw new Error("Database connection failed");
        }
        const existingUser = await db.collection<User>("users").findOne({ email: token.email });

        if (existingUser) {
          token.role = existingUser.role; 
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role; 
        console.log("The session is", session);
        console.log("The token is", token);
  
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
});

export { handler as GET, handler as POST };

