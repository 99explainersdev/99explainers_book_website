

import React from "react";
import Image from "next/image";
import { getAllBooks } from "@/services/getReq";
import { Book } from "@/types";
import Link from "next/link";

const LatestAdditions = async () => {
  const res = await getAllBooks();
  const books = res.books.slice(0, 3); // Show only 3 books

  return (
    <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 py-12 bg-[#FFEED6] flex flex-col items-center relative  mb-[30px]">
      {/* Background Shape (Visible only on lg and larger screens) */}
      <div className="absolute bottom-0 w-full h-1/2 bg-[#DE3D3A] rounded-t-3xl z-0 max-w-[90%] md:max-w-[85%] lg:max-w-[80%] xl:max-w-[75%] hidden lg:block" />

      {/* Content Container with proper z-index */}
      <div className="flex flex-col items-center w-full relative z-10">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-center text-red-600">
            OUR LATEST ADDITIONS
        </h2>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-7xl mb-8">
          {books.map((book: Book) => (
            <div
              key={book._id}
              className="relative bg-[#DE3D3A] lg:bg-[#DE3D3A] rounded-lg p-4 sm:p-6 flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {/* Book Image */}
              <div className="relative w-full max-w-[250px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[350px] h-[320px] sm:h-[350px] md:h-[400px] lg:h-[450px] mb-4">
                <Image
                  src={book.image_url}
                  alt={book.title}
                  // layout="fill"
                  fill
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>

              {/* Book Title */}
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">{book.title}</h3>

              {/* Price */}
              <p className="text-gray-200 mb-4 text-sm sm:text-base">
                <span className="line-through text-gray-400">৳ {book.price.original}</span>{" "}
                <span className="font-bold">৳ {book.price.discounted}</span>
              </p>

              {/* View Details Button */}
              <Link href={`/books/${book._id}`}>
                <button className="bg-[#FFEED6] hover:bg-[#F7B86D] text-black font-semibold py-2 sm:py-3 px-5 sm:px-6 md:px-8 rounded-full transition duration-300">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Show All Button Container */}
        <div className="w-full flex justify-center mt-8">
          <Link href="/books">
            <button className="bg-white hover:bg-[#F7B86D] text-black font-semibold py-3 px-6 sm:px-8 md:px-12 rounded-full transition duration-300 shadow-md hover:shadow-lg">
              Show All
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LatestAdditions;