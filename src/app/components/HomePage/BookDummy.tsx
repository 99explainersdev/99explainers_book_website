import { getAllBooks } from "@/services/getReq";
import React from "react";
import Image from "next/image";
import { Book } from "@/types";

const BookDummy = async () => {
  const res = await getAllBooks();
  const books = res.books;

  return (
    <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book: Book) => (
        <div
          key={book._id}
          className="flex flex-col md:flex-row border border-red-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
        >
          {/* Book Image */}
          <div className="md:w-1/3 p-4">
            <Image
              src={book.image_url}
              alt={book.title}
              width={296}
              height={244}
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Book Details */}
          <div className="md:w-2/3 p-6">
            <h2 className="text-3xl font-bold text-red-800 mb-2">{book.title}</h2>
            <p className="text-gray-700 mb-1">
              <strong className="text-red-600">Author:</strong> {book.author}
            </p>
            <p className="text-gray-700 mb-1">
              <strong className="text-red-600">Illustrator:</strong> {book.illustrator}
            </p>
            <p className="text-gray-700 mb-1">
              <strong className="text-red-600">Description:</strong> {book.description}
            </p>
            <p className="text-gray-700 mb-1">
              <strong className="text-red-600">Category:</strong> {book.books_category}
            </p>
            <p className="text-gray-700 mb-1">
              <strong className="text-red-600">Age Group:</strong> {book.ages_category}
            </p>
            <p className="text-gray-700 mb-1">
              <strong className="text-red-600">Format:</strong> {book.format}
            </p>
            <p className="text-gray-700 mb-1">
              <strong className="text-red-600">Pages:</strong> {book.pages}
            </p>
            <p className="text-gray-700 mb-1">
              <strong className="text-red-600">Size:</strong> {book.size}
            </p>
            <p className="text-gray-700 mb-1">
              <strong className="text-red-600">Publication Date:</strong> {book.publication_date}
            </p>
            <p className="text-gray-700 mb-1">
              <strong className="text-red-600">Price:</strong>{" "}
              <span className="line-through text-red-400">${book.price.original}</span>{" "}
              <span className="font-bold text-red-800">${book.price.discounted}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookDummy;