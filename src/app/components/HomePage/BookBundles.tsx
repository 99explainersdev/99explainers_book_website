"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Bundle {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
}

const BookBundles: React.FC = () => {
  const allBundles: Bundle[] = [
    { id: 1, title: "Bundle 1", imageUrl: "/assets/book1.png", price: 29.99 },
    { id: 2, title: "Bundle 2", imageUrl: "/assets/book2.png", price: 39.99 },
    { id: 3, title: "Bundle 3", imageUrl: "/assets/book3.png", price: 49.99 },
    { id: 4, title: "Bundle 4", imageUrl: "/assets/book1.png", price: 29.99 },
    { id: 5, title: "Bundle 5", imageUrl: "/assets/book2.png", price: 39.99 },
    { id: 6, title: "Bundle 6", imageUrl: "/assets/book3.png", price: 49.99 },
  ];

  const [visibleBundles, setVisibleBundles] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const updateBundles = () => {
      if (window.innerWidth < 640) setVisibleBundles(1);
      else if (window.innerWidth < 1024) setVisibleBundles(2);
      else setVisibleBundles(3);
    };

    updateBundles();
    window.addEventListener("resize", updateBundles);
    return () => window.removeEventListener("resize", updateBundles);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + visibleBundles >= allBundles.length) 
        ? 0 
        : prevIndex + visibleBundles
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - visibleBundles < 0) 
        ? Math.max(0, allBundles.length - visibleBundles) 
        : prevIndex - visibleBundles
    );
  };

  const visibleBundlesArray = allBundles.slice(
    currentIndex,
    currentIndex + visibleBundles
  );

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="absolute md:-top-32 w-full flex justify-center z-10">
        <div className="relative w-full max-w-7xl px-4">
          <h2 className="text-3xl md:text-4xl py-2 lg:text-5xl font-bold text-center text-[#F5D368]">
            BOOK BUNDLES
          </h2>

          <div className="relative bg-[#FFE6DF] rounded-xl p-6 flex justify-center items-center shadow-lg">
            {/* Previous Button */}
            <button 
              onClick={prevSlide}
              className="absolute left-2 z-10 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors"
              aria-label="Previous bundles"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>

            {/* Bundles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleBundlesArray.map((bundle) => (
                <div
                  key={bundle.id}
                  className="p-4 transition-all duration-300 transform"
                >
                  <div className="flex flex-col items-center">
                    <div className="relative h-[240px] w-[240px] md:h-[300px] md:w-[300px]">
                      <Image
                        src={bundle.imageUrl}
                        alt={bundle.title}
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                    <h3 className="text-xl md:text-2xl text-black font-semibold mt-4 text-center">
                      {bundle.title}
                    </h3>
                    <p className="text-lg md:text-xl text-black text-center">
                      Price: ${bundle.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Next Button */}
            <button 
              onClick={nextSlide}
              className="absolute right-2 z-10 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors"
              aria-label="Next bundles"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: Math.ceil(allBundles.length / visibleBundles) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * visibleBundles)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  Math.floor(currentIndex / visibleBundles) === index
                    ? "bg-[#F5D368]"
                    : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookBundles;