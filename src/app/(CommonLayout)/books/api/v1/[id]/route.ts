// import { connectDB } from "@/lib/connectDB";
// import { NextResponse } from "next/server";
// import { ObjectId } from "mongodb"; // Import ObjectId

// export const GET = async (req: Request, context: { params: { id: string } }) => {
//   try {

//     // console.log("Context", context)
//     const { id } = await context.params;
//     // console.log("This is from params id business", id);

//     if (!id || !ObjectId.isValid(id)) {
//       return NextResponse.json({ message: "Invalid book ID" }, { status: 400 });
//     }

//     const db = await connectDB();
//     if (!db) {
//       return NextResponse.json({ message: "Database connection failed" }, { status: 500 });
//     }

//     const booksCollection = db.collection("books");
//     const book = await booksCollection.findOne({ _id: new ObjectId(id) });

//     if (!book) {
//       return NextResponse.json({ message: "No Data Found" }, { status: 404 });
//     }

//     return NextResponse.json(book, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching book:", error);
//     return NextResponse.json({ message: "Error fetching data", error }, { status: 500 });
//   }
// };


// import { connectDB } from "@/lib/connectDB";
// import { NextResponse } from "next/server";
// import { ObjectId } from "mongodb";

// // Define the correct type for the context parameter
// type RouteContext = {
//   params: {
//     id: string;
//   };
// };

// export async function GET(
//   req: Request,
//   { params }: RouteContext  // Destructure params directly
// ) {
//   try {
//     const { id } = await params;  // Access id directly from params

//     if (!id || !ObjectId.isValid(id)) {
//       return NextResponse.json({ message: "Invalid book ID" }, { status: 400 });
//     }

//     const db = await connectDB();
//     if (!db) {
//       return NextResponse.json({ message: "Database connection failed" }, { status: 500 });
//     }

//     const booksCollection = db.collection("books");
//     const book = await booksCollection.findOne({ _id: new ObjectId(id) });

//     if (!book) {
//       return NextResponse.json({ message: "No Data Found" }, { status: 404 });
//     }

//     return NextResponse.json(book, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching book:", error);
//     return NextResponse.json({ message: "Error fetching data", error }, { status: 500 });
//   }
// }

// import { connectDB } from "@/lib/connectDB";
// import { NextResponse } from "next/server";
// import { ObjectId } from "mongodb";

// // Define the correct type for the context parameter
// type RouteContext = {
//   params: {
//     id: string;
//   };
// };

// export async function GET(
//   req: Request,
//   { params }: RouteContext  // Destructure params directly
// ) {
//   try {
//     // Await the params object before destructuring
//     const { id } = await params;  // Await params here

//     if (!id || !ObjectId.isValid(id)) {
//       return NextResponse.json({ message: "Invalid book ID" }, { status: 400 });
//     }

//     const db = await connectDB();
//     if (!db) {
//       return NextResponse.json({ message: "Database connection failed" }, { status: 500 });
//     }

//     const booksCollection = db.collection("books");
//     const book = await booksCollection.findOne({ _id: new ObjectId(id) });

//     if (!book) {
//       return NextResponse.json({ message: "No Data Found" }, { status: 404 });
//     }

//     return NextResponse.json(book, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching book:", error);
//     return NextResponse.json({ message: "Error fetching data", error }, { status: 500 });
//   }
// }
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Treat params as a Promise
) {
  try {
    // Await the params object to resolve the dynamic route parameter
    const { id } = await params;

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
}


// import { connectDB } from "@/lib/connectDB";
// import { NextResponse } from "next/server";
// import { ObjectId } from "mongodb";
// import { type Book } from "../../../../../../types";

// interface RouteSegment {
//   params: {
//     id: string;
//   };
// }

// export async function GET(
//   req: Request,
//   context: RouteSegment
// ): Promise<NextResponse> {
//   try {
//     const id = context.params.id;

//     if (!id || !ObjectId.isValid(id)) {
//       return NextResponse.json({ message: "Invalid book ID" }, { status: 400 });
//     }

//     const db = await connectDB();
//     if (!db) {
//       return NextResponse.json(
//         { message: "Database connection failed" },
//         { status: 500 }
//       );
//     }

//     const booksCollection = db.collection<Book>("books");
//     const book = await booksCollection.findOne({ 
//       _id: new ObjectId(id) 
//     } as unknown as Book);

//     if (!book) {
//       return NextResponse.json({ message: "No Data Found" }, { status: 404 });
//     }

//     return NextResponse.json(book, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching book:", error);
//     return NextResponse.json(
//       { message: "Error fetching data", error },
//       { status: 500 }
//     );
//   }
// }