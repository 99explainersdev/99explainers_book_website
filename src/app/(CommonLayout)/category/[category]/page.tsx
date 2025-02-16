'use client';

import React, { useState, useEffect, use } from "react";
import { Book } from "@/types";
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import LoadingSpinner from "@/app/components/Shared/LoadingSpinner"; // Import the loading spinner component

const CategoryPage = ({ params }: { params: Promise<{ category: string }> }) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Use React.use() to unwrap the params Promise
    const { category } = use(params);

    useEffect(() => {
        const fetchBooks = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // Fetch books from the API
                const response = await fetch(`/category/api/${category}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch books: Status ${response.status}`);
                }

                const data = await response.json();
                setBooks(data.books || []); // Assuming the API returns { books: Book[] }
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setIsLoading(false);
            }
        };

        fetchBooks();
    }, [category]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen"> {/* Adjust height as needed */}
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 my-[150px]">
            {/* <h1 className="text-2xl font-bold mb-4 capitalize">{category}</h1> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {books.map((book) => (
                    <div key={book?._id} className="group relative">
                        <div className="bg-white rounded-3xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                            <div className="relative w-full pt-[100%]">
                                <Image
                                    src={book?.image_url}
                                    alt={book?.title}
                                    fill
                                    className="object-cover p-4"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    style={{ objectFit: "cover" }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary_blue/90 to-transparent flex items-end justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Link href={`/books/${book?._id}`}>
                                        <button className="w-full bg-primary_red text-white py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transform transition hover:bg-opacity-90">
                                            <BookOpen size={20} />
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="space-x-8">
                                    {book.ages_category && (
                                        <div className="inline-block px-3 py-1 bg-primary_blue/10 text-primary_red rounded-full text-sm mb-3">
                                            Age: {book?.ages_category}
                                        </div>
                                    )}
                                    {book.books_category && (
                                        <div className="inline-block px-3 py-1 bg-primary_blue/30 text-primary_red rounded-full text-sm mb-3 font-bold">
                                            {book?.books_category}
                                        </div>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-primary_blue mb-2">
                                    {book?.title}
                                </h3>
                                <p className="text-gray-600 mb-3 line-clamp-2">
                                    {book?.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-primary_red">
                                        ৳ {book?.price?.discounted}
                                    </span>
                                    <span className="text-2xl font-bold text-gray-500">
                                        <del>৳ {book?.price?.original}</del>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;