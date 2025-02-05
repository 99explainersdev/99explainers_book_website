import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb"; // Import ObjectId

export const GET = async (req: Request, context: { params: { id: string } }) => {
  try {

    // console.log("Context", context)
    const { id } = await context.params;
    // console.log("This is from params id business", id);

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid book ID" }, { status: 400 });
    }

    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ message: "Database connection failed" }, { status: 500 });
    }

    const booksCollection = db.collection("books");
    const book = await booksCollection.findOne({ _id: new ObjectId(id) });

    if (!book) {
      return NextResponse.json({ message: "No Data Found" }, { status: 404 });
    }

    return NextResponse.json(book, { status: 200 });
  } catch (error) {
    console.error("Error fetching book:", error);
    return NextResponse.json({ message: "Error fetching data", error }, { status: 500 });
  }
};
