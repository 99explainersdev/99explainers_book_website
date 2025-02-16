"use client";

import { getAllBooks } from "@/services/getReq";
import Image from "next/image";
import { Search, BookOpen } from "lucide-react";
import { Book } from "@/types";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import LoadingSpinner from "@/app/components/Shared/LoadingSpinner";

const BooksDisplay = () => {
  const [inputValue, setInputValue] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedAge, setSelectedAge] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>(""); // "" | "asc" | "desc"
  const [searchTerm, setSearchTerm] = useState(""); // This state holds the search term

  const categoryOptions = [
    "All Categories",
    "Story Book",
    "Picture Book",
    "Coloring Book",
    "Rhyme Books",
    "non fictional book",
    "Teen Book",
  ];

  const ageOptions = ["All Ages", "0-4", "5-8", "9-12", "13+"];

  const fetchBooks = useCallback(async () => {
    setIsLoading(true);
    setNoResults(false);
    setSuggestions([]);
    try {
      const res = await getAllBooks();
      const initialBooks: Book[] = res.books.map((book: Book) => ({
        ...book,
        books_category: book.books_category.toLowerCase(),
      }));
      setBooks(initialBooks);
      setFilteredBooks(initialBooks);
      if (initialBooks.length === 0) {
        setNoResults(true);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setNoResults(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const generateSuggestions = (term: string) => {
    if (!term) {
      return [];
    }

    const lowerTerm = term.toLowerCase();
    const newSuggestions: string[] = [];

    for (const book of books) {
      if (book.title.toLowerCase().startsWith(lowerTerm)) {
        newSuggestions.push(book.title);
      }

      if (newSuggestions.length >= 5) {
        break;
      }
    }
    return newSuggestions;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setInputValue(term);
    setSuggestions(generateSuggestions(term)); // Array of suggested books only 5 will be shown at most if matches
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setSuggestions([]);
  };

  // The books that matches the search term will be returned
  const handleSearch = () => {
    setSearchTerm(inputValue); // Update the search term state with the input value
    setInputValue(""); // Clear the input field after search
    setSuggestions([]); // Clear the suggestions after search
  };

  const handleBooksClick = () => {
    setFilteredBooks(books);
    setInputValue("");
    setSuggestions([]);
    setNoResults(false);
    setSelectedCategory("all");
    setSelectedAge("all");
    setSortOrder("");
    setSearchTerm(""); //Clear search
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAge(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value);
  };

  const applyFilters = useCallback(
    (bookList: Book[]): Book[] => {
      let filtered = bookList;

      if (selectedCategory !== "all") {
        filtered = filtered.filter(
          (book) => book.books_category === selectedCategory.toLowerCase() //Added toLower here just in case
        );
      }

      if (selectedAge !== "all") {
        filtered = filtered.filter(
          (book) => book.ages_category === selectedAge
        );
      }

      return filtered;
    },
    [selectedCategory, selectedAge]
  );

  const applySorting = useCallback(
    (bookList: Book[]): Book[] => {
      if (sortOrder === "asc") {
        return [...bookList].sort(
          (a, b) => a.price.discounted - b.price.discounted
        );
      } else if (sortOrder === "desc") {
        return [...bookList].sort(
          (a, b) => b.price.discounted - a.price.discounted
        );
      }
      return bookList;
    },
    [sortOrder]
  );

  useEffect(() => {
    let newFilteredBooks = [...books];

    // Apply category and age filters
    newFilteredBooks = applyFilters(newFilteredBooks);

    // Apply search filter
    if (searchTerm) {
      // Use the searchTerm state
      const term = searchTerm.toLowerCase();
      newFilteredBooks = newFilteredBooks.filter((book) =>
        book.title.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    newFilteredBooks = applySorting(newFilteredBooks);

    setFilteredBooks(newFilteredBooks);
    setNoResults(newFilteredBooks.length === 0);
  }, [
    books,
    selectedCategory,
    selectedAge,
    searchTerm, // Use the searchTerm state
    sortOrder,
    applyFilters,
    applySorting,
  ]);

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission if inside a form
      handleSearch();
    }
  };

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
              placeholder="Search for books..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown} // Add this line
              className="p-4 pl-12 w-full rounded-2xl bg-white text-gray-700 border-2 border-gray-200 focus:border-primary_blue focus:outline-none focus:ring-2 focus:ring-primary_blue/20 shadow-sm text-lg transition-all duration-300"
            />

            {suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 bg-white border border-gray-200 rounded-b-2xl mt-1 shadow-md z-10">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={`${suggestion}-${index}`}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-4 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            onClick={handleSearch}
            className="bg-primary_blue text-white py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transform transition hover:bg-opacity-90"
          >
            Search
          </button>

          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="p-4 rounded-2xl bg-white text-primary_red border-2 border-gray-200 focus:border-primary_blue focus:outline-none focus:ring-2 focus:ring-primary_blue/20 shadow-sm text-lg min-w-[200px] cursor-pointer transition-all duration-300"
          >
            {categoryOptions.map((category) => (
              <option
                key={category}
                value={category === "All Categories" ? "all" : category}
              >
                {category}
              </option>
            ))}
          </select>

          <select
            value={selectedAge}
            onChange={handleAgeChange}
            className="p-4 rounded-2xl bg-white text-primary_red border-2 border-gray-200 focus:border-primary_blue focus:outline-none focus:ring-2 focus:ring-primary_blue/20 shadow-sm text-lg min-w-[200px] cursor-pointer transition-all duration-300"
          >
            {ageOptions.map((age) => (
              <option key={age} value={age === "All Ages" ? "all" : age}>
                {age}
              </option>
            ))}
          </select>

          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="p-4 rounded-2xl bg-white text-primary_red border-2 border-gray-200 focus:border-primary_blue focus:outline-none focus:ring-2 focus:ring-primary_blue/20 shadow-sm text-lg min-w-[200px] cursor-pointer transition-all duration-300"
          >
            <option value="">Sort By Price</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
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
            onClick={handleBooksClick}
            className="text-black font-bold hover:text-gray-700 transition-colors duration-200"
          >
            Books
          </Link>
        </nav>

        {/* Books Grid */}
        {noResults ? (
          <div className="text-center text-gray-500 text-lg">
            No books found matching your search criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooks.map((book) => (
              <div key={book._id} className="group relative">
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="relative w-full pt-[100%]">
                    <Image
                      src={book.image_url}
                      alt={book.title}
                      fill
                      className="object-cover p-4"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Added sizes prop
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
                      <span className="text-2xl font-bold text-gray-500">
                        <del>৳ {book.price.original}</del>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksDisplay;