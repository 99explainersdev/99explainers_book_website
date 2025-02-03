import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { User } from '../../../../models/User';
import { Collection } from "mongodb";


export const POST = async (request: Request): Promise<Response> => {
  try {
    const newUser = await request.json();

    // Check if email exists
    if (!newUser.email || !newUser.password || !newUser.name) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // Connect to database
    console.log("Connecting to database...");
    const db = await connectDB();
    console.log("Connected to database");

    if (!db) {
      return NextResponse.json({ message: "Database connection failed" }, { status: 500 });
    }
    const userCollection: Collection<User> = db.collection("users");

    // Check if user already exists
    const exist = await userCollection.findOne({ email: newUser.email });

    if (exist) {
      return NextResponse.json({ message: "User Exists" }, { status: 409 });
    }

    // Assign default role
    let role = "user";
    if (newUser.email === "yousufj93006@gmail.com") {
      role = "admin";
    }

    // Insert user without hashing password
    await userCollection.insertOne({
      ...newUser,
      role,
    });

    return NextResponse.json({ message: "User Created" }, { status: 201 });

  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Something Went Wrong", error },
      { status: 500 }
    );
  }
};
