import React from "react";
import Image from "next/image";

interface Feature {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const WhyAreWeSpecial: React.FC = () => {
  const features: Feature[] = [
    {
      id: 1,
      title: "Digital Connectivity",
      description:
        "All content in our books comes with a QR code which when scanned will play digital rhymes and digital storytelling videos through beautiful animations.",
      imageUrl: "/assets/feature1.png",
    },
    {
      id: 2,
      title: "More Engagement",
      description:
        "Each book will have a coloring section on a few pages related to the story and poem which will make children more engaged with this book.",
      imageUrl: "/assets/feature2.png",
    },
    {
      id: 3,
      title: "Gifts",
      description:
        "A color box will be provided with every set of 5 books to color in the coloring sections of the book.",
      imageUrl: "/assets/feature3.png",
    },
    {
      id: 4,
      title: "99 School",
      description:
        "There will also be QR codes in the coloring section of the books. After scanning, a video from 99 School will play, where an ideal mentor will color the books in a fun way.",
      imageUrl: "/assets/feature4.png",
    },
    {
      id: 5,
      title: "Extreme Enjoyment",
      description:
        "Children will have great fun by reading, drawing, listening, and learning from a single book! With all these exciting activities, each book will become a source of extreme enjoyment.",
      imageUrl: "/assets/feature5.png",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center text-white">
      <div className="w-full bg-[#FFEED6]">
        <div className="bg-[#B32025] rounded-b-2xl mx-4 sm:mx-10 lg:mx-[120px] mb-8 sm:mb-[84px] px-4 sm:px-8 py-8">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-[500px] mb-8 text-center text-[#F5D36B]">
              WHY ARE WE SPECIAL
            </h2>

            <div className="w-full max-w-6xl flex flex-col items-center space-y-8">
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`flex flex-col md:flex-row items-center md:items-start justify-center py-4 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Image */}
                  <div className="relative w-full sm:w-[400px] md:w-[480px] lg:w-[508px] h-[250px] sm:h-[280px] md:h-[303px] mb-4 md:mb-0 flex-shrink-0">
                    <Image
                      src={feature.imageUrl}
                      alt={feature.title}
                      fill
                      className="object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col text-center md:text-left px-4 pt-12 md:px-8">
                    <h3 className="text-2xl md:text-3xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-lg">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyAreWeSpecial;
