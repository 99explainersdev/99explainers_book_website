"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, BookOpen } from "lucide-react";

export default function BooksDisplay() {
  const [isHovered, setIsHovered] = useState<number | null>(null);

  const categories = [
    { value: "picture", label: "📸 Picture Books" },
    { value: "story", label: "📚 Story Books" },
    { value: "coloring", label: "🎨 Coloring Books" },
    { value: "rhyme", label: "🎵 Rhyme Books" },
    { value: "nonfiction", label: "🌟 Learn & Grow" },
    { value: "teen", label: "✨ Teen Books" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="p-6 max-w-7xl mx-auto pt-[150px]">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary_red mb-4">
           99 Book Publication 
            <span className="text-primary_red">✨</span>
          </h1>
          <p className="text-gray-600 text-lg">Discover amazing stories and adventures!</p>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row items-stretch gap-4 mb-12">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for magical books..."
              className="p-4 pl-12 w-full rounded-2xl bg-white text-gray-700 border-2 border-gray-200 focus:border-primary_blue focus:outline-none focus:ring-2 focus:ring-primary_blue/20 shadow-sm text-lg transition-all duration-300"
            />
          </div>
          <select className="p-4 rounded-2xl bg-white text-gray-700 border-2 border-gray-200 focus:border-primary_blue focus:outline-none focus:ring-2 focus:ring-primary_blue/20 shadow-sm text-lg min-w-[200px] cursor-pointer transition-all duration-300">
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-8">
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="relative w-full pt-[100%]">
                  <Image
                    src="/assets/book1.png"
                    alt="Book Cover"
                    fill
                    className="object-cover p-4"
                  />
                  {isHovered === index && (
                    <div className="absolute inset-0 bg-gradient-to-t from-primary_blue/90 to-transparent flex items-end justify-center p-6 transition-opacity duration-300">
                      <button className="w-full bg-primary_red text-white py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transform transition hover:bg-opacity-90">
                        <BookOpen size={20} />
                        View Details
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="inline-block px-3 py-1 bg-primary_blue/10 text-primary_red rounded-full text-sm mb-3">
                    New!
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Book Title</h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    Short description of the book...
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary_red">৳ 240</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}