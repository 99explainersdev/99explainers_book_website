// Step : 3 (Client side fetch is 1, services is 2 for route)
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const db = await connectDB();
    if (!db) {
      return new NextResponse("Database connection failed", { status: 500 });
    }
    const booksCollection = db.collection("books");

    // Fetch all books from the database
    const allBooks = await booksCollection.find().toArray();
    // console.log("This is from get-all route", allBooks);
    // console.log(JSON.stringify({ books: allBooks }))

    return new NextResponse(JSON.stringify({ books: allBooks }), { status: 200 });
  } catch {
    return new NextResponse("Failed to fetch books", { status: 500 });
  }
};
