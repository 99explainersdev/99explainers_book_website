import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const searchQuery = url.searchParams.get("search")?.trim();
   

    const db = await connectDB();
    if (!db) {
      return new NextResponse("Database connection failed", { status: 500 });
    }

    const booksCollection = db.collection("books");

    let query = {};
    if (searchQuery) {
      query = { title: { $regex: searchQuery, $options: "i" } }; // Case-insensitive search
    }

    const filteredBooks = await booksCollection.find(query).toArray();

    return new NextResponse(JSON.stringify({ books: filteredBooks }), { status: 200 });
  } catch (error) {
    console.error("Error fetching books:", error);
    return new NextResponse("Failed to fetch books", { status: 500 });
  }
};
