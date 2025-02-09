"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

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

    const [startIndex, setStartIndex] = useState(0);
    const [visibleBundles, setVisibleBundles] = useState(3);

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

    const handlePrev = () => {
        setStartIndex(Math.max(0, startIndex - 1));
    };

    const handleNext = () => {
        setStartIndex(Math.min(allBundles.length - visibleBundles, startIndex + 1));
    };

    const currentBundles = allBundles.slice(startIndex, startIndex + visibleBundles);

    return (
        <div className="relative w-full flex flex-col items-center">
            {/* Overlapping Wrapper */}
            <div className="absolute -top-32 w-full flex justify-center z-10">
                <div className="relative w-full max-w-7xl">
                    <h2 className="text-3xl md:text-4xl py-2 lg:text-5xl font-bold text-center text-[#F5D368]">
                        BOOK BUNDLES
                    </h2>
                    
                    {/* Bundles Section */}
                    <div className="relative bg-[#FFE6DF] rounded-xl p-6 space-x-4 flex justify-center items-center shadow-lg">
                        {currentBundles.map((bundle) => (
                            <div key={bundle.id} className="flex flex-col items-center p-4 w-full sm:w-1/2 lg:w-1/3">
                                <div className="relative h-[240px] w-[240px] md:h-[300px] md:w-[300px]">
                                    <Image
                                        src={bundle.imageUrl}
                                        alt={bundle.title}
                                        // layout="fill"
                                        // objectFit="contain"
                                        fill
                                        className="rounded-md"
                                    />
                                </div>
                                <h3 className="text-xl md:text-2xl text-black font-semibold mt-4 text-center">
                                    {bundle.title}
                                </h3>
                                <p className="text-lg md:text-xl text-black text-center">
                                    Price: ${bundle.price.toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-[-2rem] md:left-[-3rem] top-1/2 transform -translate-y-1/2 bg-white/80 text-black p-3 rounded-full shadow-lg hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        disabled={startIndex <= 0}
                    >
                        <AiOutlineLeft size={35} />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-[-2rem] md:right-[-3rem] top-1/2 transform -translate-y-1/2 bg-white/80 text-black p-3 rounded-full shadow-lg hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        disabled={startIndex >= allBundles.length - visibleBundles}
                    >
                        <AiOutlineRight size={35} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookBundles;
