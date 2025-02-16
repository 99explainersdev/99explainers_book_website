import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

interface Params {
    category: string;
}

export async function GET(
    request: Request,
    { params }: { params: Promise<Params> } // Treat params as a Promise
) {
    try {
        // Await params before accessing its properties
        const awaitedParams = await params;
        const { category } = awaitedParams;
        console.log('This is server', category);

        if (!category) {
            return NextResponse.json(
                { message: "Category parameter is required" },
                { status: 400 }
            );
        }

        const db = await connectDB();
        if (!db) {
            return NextResponse.json(
                { message: "Database connection failed" },
                { status: 500 }
            );
        }

        const booksCollection = db.collection("books");

        // Find all books matching either books_category or ages_category
        const books = await booksCollection
            .find({
                $or: [
                    {
                        books_category: {
                            $regex: new RegExp(category, 'i') // Case-insensitive search
                        }
                    },
                    {
                        ages_category: {
                            $regex: new RegExp(category, 'i') // Case-insensitive search
                        }
                    }
                ]
            })
            .toArray();

        if (!books || books.length === 0) {
            return NextResponse.json(
                { message: "No books found in this category" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: "Books retrieved successfully",
                books
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching books by category:", error);
        return NextResponse.json(
            { message: "Error fetching data", error },
            { status: 500 }
        );
    }
}