"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Book } from "@/types";
import { useDispatch } from "react-redux";
import { add } from "../../../redux/cartSlice";
import Swal from "sweetalert2";
import LoadingSpinner from "@/app/components/Shared/LoadingSpinner";

const SingleBookDetailPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = React.use(params);
  const [details, setDetails] = useState<Book | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch specific book details
        const bookResponse = await fetch(
          `http://localhost:3000/books/api/v1/${id}`
        );
        if (!bookResponse.ok) {
          throw new Error("Book not found");
        }
        const bookData = await bookResponse.json();
        setDetails(bookData);

        // Fetch all books for related books section
        const allBooksResponse = await fetch(
          "http://localhost:3000/books/api/v1/get-all"
        );
        if (!allBooksResponse.ok) {
          throw new Error("Failed to fetch related books");
        }
        const allBooksData = await allBooksResponse.json();

        // Filter out current book and limit to 6 related books
        const filtered = allBooksData.books
          .filter((book: Book) => book._id !== id)
          .slice(0, 6);
        setRelatedBooks(filtered);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]); // Updated dependency array to use unwrapped id

  const handleAdd = (book: Book) => {
    dispatch(add(book));

    // Show SweetAlert on successful add to cart
    Swal.fire({
      title: "Success!",
      text: `${book.title} added to cart!`,
      icon: "success",
      confirmButtonText: "Okay",
    });
  };

  if (isLoading) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }

  if (error || !details) {
    return (
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mt-[120px]">
        <p className="text-red-500 text-lg">{error || "Book not found."}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mt-[120px]">
      {/* Breadcrumb */}
      <nav className="py-5 flex items-center text-lg">
        <Link
          href="/"
          className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          Home
        </Link>
        <span className="mx-3 text-gray-400">/</span>
        <Link
          href="/books"
          className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          Books
        </Link>
        <span className="mx-3 text-gray-400">/</span>
        <span className="text-gray-900 font-semibold">{details.title}</span>
      </nav>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
        {/* Left Column - Images */}
        <div className="space-y-6">
          <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100 shadow-lg">
            <Image
              src={details.image_url}
              alt={`${details.title} book cover`}
              fill
              style={{ objectFit: "contain" }}
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="flex flex-col space-y-8">
          <div className="space-y-8">
            <h1 className="text-5xl font-bold text-primary_red">
              {details.title}
            </h1>

            <div className="flex items-center space-x-4">
              <p className="text-gray-500 text-xl line-through">
                ৳ {details.price.original}
              </p>
              <p className="text-3xl font-bold text-primary_red">
                ৳ {details.price.discounted}
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed pb-8 max-h-[180px] overflow-y-auto">
              {details.description}
            </p>
          </div>

          {/* Buttons Section */}
          <div className="flex flex-col space-y-4 mt-auto pt-16">
            <button
              onClick={() => handleAdd(details)}
              className="w-full bg-primary_blue text-white text-lg px-8 py-4 rounded-md hover:bg-blue-700 transition-all duration-200 transform hover:translate-y-[-2px] hover:shadow-lg"
            >
              Add To Cart
            </button>
            <button className="w-full bg-primary_red text-white text-lg px-8 py-4 rounded-md hover:bg-red-600 transition-all duration-200 transform hover:translate-y-[-2px] hover:shadow-lg">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Product Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20 text-lg">
        <div>
          <h3 className="font-bold mb-3 text-2xl text-primary_red">Author</h3>
          <p className="text-gray-700">{details.author}</p>
          <h3 className="font-bold text-2xl mt-6 mb-3 text-primary_red">
            ISBN
          </h3>
          <p className="text-gray-700">{details.isbn}</p>
          <h3 className="font-bold text-2xl mt-6 mb-3 text-primary_red">
            Size
          </h3>
          <p className="text-gray-700">{details.size}</p>
        </div>
        <div>
          <h3 className="font-bold text-2xl mb-3 text-primary_red">
            Illustrations
          </h3>
          <p className="text-gray-700">{details.illustrator}</p>
          <h3 className="font-bold text-2xl mt-6 mb-3 text-primary_red">
            Pages
          </h3>
          <p className="text-gray-700">{details.pages}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-3 text-primary_red">
            Publication Date
          </h3>
          <p className="text-gray-700">{details.publication_date}</p>
          <h3 className="font-bold text-2xl mt-6 mb-3 text-primary_red">
            Format
          </h3>
          <p className="text-gray-700">{details.format}</p>
        </div>
      </div>

      {/* Related Books Section */}
      {relatedBooks.length > 0 && (
        <div className="mt-24 mb-16">
          <h2 className="text-4xl font-bold text-primary_blue mb-12 text-start">
            Related Books
          </h2>

          <div className="relative">
            <div className="relative overflow-x-auto pb-8">
              <div className="flex space-x-8 px-4">
                {relatedBooks.map((book: Book) => (
                  <div key={book._id} className="w-72 flex-shrink-0 group">
                    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4">
                      <div className="relative h-96 w-full mb-4 rounded-lg overflow-hidden">
                        <Image
                          src={book.image_url}
                          alt={book.title}
                          layout="fill"
                          objectFit="cover"
                          className="transform hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg text-gray-800 h-14 text-center line-clamp-2">
                          {book.title}
                        </h3>

                        <Link href={`/books/${book._id}`} className="block">
                          <button
                            className="w-full bg-white text-primary_red border-2 border-primary_red px-6 py-3 rounded-lg 
                            hover:bg-primary_red hover:text-white transition-all duration-300 
                            font-medium shadow-sm hover:shadow-md active:scale-95"
                          >
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleBookDetailPage;
