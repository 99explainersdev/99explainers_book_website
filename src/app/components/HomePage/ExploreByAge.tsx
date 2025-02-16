import React from "react";
import Image from "next/image";
import Link from "next/link";


interface AgeCategory {
  id: number;
  title: string;
  imageUrl: string;
}

const ExploreByAge: React.FC = () => {
  const ageCategories: AgeCategory[] = [
    { id: 1, title: "0-4", imageUrl: "/assets/feature1.png" },
    { id: 2, title: "5-8", imageUrl: "/assets/age5.png" },
    { id: 3, title: "9-12", imageUrl: "/assets/age9.png" },
    { id: 4, title: "13+", imageUrl: "/assets/age13.png" },
  ];

  return (
    <div className="w-full py-8 sm:py-12 md:py-16 lg:py-20 bg-[#3A2E92] text-white ">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 sm:mb-8 md:mb-10 text-center text-[#F5D36B]">
          EXPLORE BOOKS BY AGE
        </h2>

        {/* Age Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 md:gap-16 lg:gap-8 xl:gap-12 max-w-7xl mx-auto">
          {ageCategories.map((category) => (
            <div key={category.id} className="flex flex-col items-center space-y-4">
              {/* Image Container */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56">
               <Image
                  src={category.imageUrl}
                  alt={category.title}
                  fill
                  className="rounded-lg transition-transform duration-300 hover:scale-105 object-cover"
                />
              </div>

              {/* Button */}
              <Link   href={`/category/${category.title}`}>
              <button className="bg-white hover:bg-red-600 text-red-600 hover:text-white text-base sm:text-lg md:text-xl font-semibold py-2 sm:py-3 md:py-4 px-6 sm:px-8 rounded-full w-full max-w-[200px] transition duration-300">
               Age: {category.title}
              </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreByAge;