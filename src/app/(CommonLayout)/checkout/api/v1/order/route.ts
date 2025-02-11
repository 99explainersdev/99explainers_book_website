import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const newOrder = await request.json();
  try {
    const db = await connectDB();
    if (!db) {
      return new NextResponse("Database connection failed", { status: 500 });
    }

    const res = await db.collection("orders").insertOne(newOrder);
    if (res) {
      return NextResponse.json({
        message: "Created New Order successfully",
      });
    }
  } catch {
    return new NextResponse("Failed to fetch books", { status: 500 });
  }
};
