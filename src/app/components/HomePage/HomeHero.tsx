"use client";

import Image from "next/image";

const HomeHero: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/assets/slide1.png"
          alt="Slide 1"
          fill 
        
          className="object-cover"
        />
      </div>
      <div className="absolute top-1/2 left-1/8 transform -translate-y-1/2 text-[#DA1725] max-w-lg z-10 pl-[111px]">
        <h2 className="text-4xl md:text-7xl font-bold leading-tight mb-4">
          LET&apos;S READ <span className="text-white">SOMETHING</span> DIFFERENT!
        </h2>
      </div>
    </div>
  );
};

export default HomeHero;