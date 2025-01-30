import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import {  Collection } from "mongodb";
import { TestData } from '../../../../../models/testData';



export const GET = async (): Promise<NextResponse> => {
  const db= await connectDB();
  const dataCollection: Collection<TestData> =
    db.collection<TestData>("test_data");

  try {
    const testData: TestData[] = await dataCollection.find().toArray();

    return new NextResponse(JSON.stringify({ testData }), { status: 200 });
  } catch {
    return new NextResponse("Failed to fetch products", { status: 500 });
  }
};
