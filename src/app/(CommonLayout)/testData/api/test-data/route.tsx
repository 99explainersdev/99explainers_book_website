import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  const db = await connectDB();
  const dataCollection = db.collection("test_data");

  try {
    const testData = await dataCollection.find().toArray();

    return new NextResponse(JSON.stringify({ testData }), { status: 200 });
  } catch {
    return new NextResponse("Failed to fetch products", { status: 500 });
  }
};
