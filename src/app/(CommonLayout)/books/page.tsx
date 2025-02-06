import { getAllBooks } from "@/services/getReq";
import Image from "next/image";
import { Search, BookOpen } from "lucide-react";
import { Book } from "@/types";
import Link from "next/link";

const BooksDisplay = async () => {
  const res = await getAllBooks();
  const books: Book[] = res.books;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="p-6 max-w-7xl mx-auto pt-[150px]">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary_red mb-4">
            99 Book Publication<span className="text-primary_red">✨</span>
          </h1>
          <p className="text-primary_blue font-semibold text-xl">
            Discover amazing stories and adventures!
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row items-stretch gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-500" />
            <input
              type="text"
              placeholder="Search for magical books..."
              className="p-4 pl-12 w-full rounded-2xl bg-white text-gray-700 border-2 border-gray-200 focus:border-primary_blue focus:outline-none focus:ring-2 focus:ring-primary_blue/20 shadow-sm text-lg transition-all duration-300"
            />
          </div>

          <select className="p-4 rounded-2xl bg-white text-primary_red border-2 border-gray-200 focus:border-primary_blue focus:outline-none focus:ring-2 focus:ring-primary_blue/20 shadow-sm text-lg min-w-[200px] cursor-pointer transition-all duration-300">
            <option value="all">All Categories</option>
          </select>
        </div>

        {/* Breadcrumb */}
        <nav className="py-5 flex items-center text-lg  mb-5">
          <Link
            href="/"
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            Home
          </Link>
          <span className="mx-3 text-gray-400">/</span>
          <Link
            href="/books"
            className="text-black font-bold hover:text-gray-700 transition-colors duration-200"
          >
            Books
          </Link>
        </nav>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <div key={book._id} className="group relative">
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="relative w-full pt-[100%]">
                  <Image
                    src={book.image_url}
                    alt={book.title}
                    fill
                    className="object-cover p-4"
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
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BooksDisplay;
