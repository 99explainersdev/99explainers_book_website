import React from "react";
import Image from "next/image";
import Link from "next/link";

interface BookCategory {
  id: number;
  title: string;
  imageUrl: string;
  link: string;
}

const ExploreBYCategory: React.FC = () => {
  const categories: BookCategory[] = [
    {
      id: 1,
      title: "Picture Books",
      imageUrl: "/assets/picture.png",
      link: "/category/picture-books",
    },
    {
      id: 2,
      title: "Story Books",
      imageUrl: "/assets/story.png",
      link: "/category/story-books",
    },
    {
      id: 3,
      title: "Coloring Books",
      imageUrl: "/assets/coloring.png",
      link: "/category/coloring-books",
    },
    {
      id: 4,
      title: "Rhyme Books",
      imageUrl: "/assets/rhyme.png",
      link: "/category/rhyme-books",
    },
    {
      id: 5,
      title: "Non-Fiction Books",
      imageUrl: "/assets/nonfiction.png",
      link: "/category/non-fiction-books",
    },
    {
      id: 6,
      title: "Teen Books",
      imageUrl: "/assets/teen.png",
      link: "/category/teen-books",
    },
  ];

  return (
    <section className="w-full py-8 sm:py-12 md:py-40  bg-[#3A2E92] text-white ">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 ">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 sm:mb-12 md:mb-16 text-center text-[#F5D368]">
          EXPLORE BOOKS BY CATEGORY
        </h2>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-8 sm:gap-y-12 gap-x-4 sm:gap-x-6 md:gap-8 max-w-7xl mx-auto">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col items-center space-y-4 px-2 sm:px-3 md:px-4"
            >
              {/* Image Link */}
              <Link
                href={category.link}
                className="relative aspect-square w-28 sm:w-32 md:w-40 lg:w-44 xl:w-48 block"
              >
                <Image
                  src={category.imageUrl}
                  alt={category.title}
                  fill
                  className="rounded-lg transition-transform duration-300 hover:scale-105 object-contain"
                  sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, (max-width: 1024px) 160px, (max-width: 1280px) 176px, 192px"
                />
              </Link>

              {/* Category Button */}
              <Link
                href={category.link}
                className="bg-white hover:bg-red-600 text-red-600 hover:text-white text-sm sm:text-base font-semibold py-3 px-6 sm:px-8 rounded-full max-w-[220px] text-center transition-all duration-300 hover:shadow-lg whitespace-nowrap"
              >
                {category.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreBYCategory;
