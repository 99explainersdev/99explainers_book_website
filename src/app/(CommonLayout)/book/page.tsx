"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import LoadingSpinner from "@/app/components/Shared/LoadingSpinner";

// Wrap the main component in Suspense
const SingleBook = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SingleBookContent />
    </Suspense>
  );
};

// Move the logic to a separate component
const SingleBookContent = () => {
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("search");

  const [books, setBooks] = useState<
    {
      _id: string;
      title: string;
      image_url: string;
      description: string;
      ages_category: string;
      books_category: string;
      price: { discounted: number; original: number };
    }[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/book/api/v1/searchedBook?search=${encodeURIComponent(
            searchQuery || ""
          )}`
        );
        const data = await response.json();
        setBooks(data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [searchQuery]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="p-6 max-w-7xl mx-auto pt-[150px]">
        {searchQuery && <p>Showing results for: {searchQuery}</p>}
        {books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
            {books.map((book) => (
              <div key={book._id} className="group relative">
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="relative w-full pt-[100%]">
                    <Image
                      src={book.image_url}
                      alt={book.title}
                      fill
                      className="object-cover p-4"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary_blue/90 to-transparent flex items-end justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link href={`/books/${book._id}`}>
                        <button className="w-full bg-primary_red text-white py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transform transition hover:bg-opacity-90">
                          <BookOpen size={20} />
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-x-8">
                      <div className="inline-block px-3 py-1 bg-primary_blue/10 text-primary_red rounded-full text-sm mb-3">
                        Age: {book.ages_category}
                      </div>
                      <div className="inline-block px-3 py-1 bg-primary_blue/30 text-primary_red rounded-full text-sm mb-3 font-bold">
                        {book.books_category}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-primary_blue mb-2">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {book.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary_red">
                        ৳ {book.price.discounted}
                      </span>
                      <span className="text-gray-500 line-through">
                        ৳ {book.price.original}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-lg">
            No books found matching your search criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleBook;