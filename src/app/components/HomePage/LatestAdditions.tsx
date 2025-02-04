import React from "react";
import Image from "next/image";
import { getAllBooks } from "@/services/getReq";
import { Book } from "@/types";
import Link from "next/link";

const LatestAdditions = async () => {
  const res = await getAllBooks();
  const books = res.books;

  return (
    <div className="w-full px-4 py-12 bg-[#FFEED6] flex flex-col items-center justify-center relative">
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#DE3D3A] rounded-b-3xl z-0"></div>

      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-red-600">
        Our Latest Additions
      </h2>

      <div className="flex flex-col items-center w-full max-w-6xl z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full mb-8">
          {books.slice(0, 3).map((book: Book) => (
            <div
              key={book._id}
              className="bg-[#DE3D3A] rounded-lg p-4 flex flex-col items-center shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative w-[250px] h-[350px] mb-4">
                <Image
                  src={book.image_url}
                  alt={book.title}
                  height={350}
                  width={250}
                  className="rounded-md object-cover"
                />
              </div>
              <h3 className="text-lg text-white font-semibold mb-2 text-center">
                {book.title}
              </h3>
              <p className="text-gray-700 mb-4">
                <span className="line-through text-white">
                  Tk {book.price.original}
                </span>{" "}
                <span className="font-bold text-white">
                  Tk {book.price.discounted}
                </span>
              </p>
              <Link href={`/books/${book._id}`}>
                <button className="bg-white text-[#DE3D3A] px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>

        <Link href="/books">
          <button className="bg-white text-[#DE3D3A] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-md hover:shadow-lg">
            Show All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LatestAdditions;
