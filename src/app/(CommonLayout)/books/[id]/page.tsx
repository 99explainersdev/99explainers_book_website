import { getSpecificBook } from "@/services/getReq";
import React from "react";
import Image from "next/image";

const Page = async ({ params }: { params: { id: string } }) => {
  // Destructure `params` directly in the function signature
  const { id } = await params;

  // Fetch the book details
  const details = await getSpecificBook(id);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFEED6] p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-4xl w-full flex flex-col md:flex-row">
        {/* Book Image */}
        <div className="relative w-full md:w-1/3 h-[400px] mb-6 md:mb-0">
          <Image
            src={details.image_url}
            alt={details.title}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        {/* Book Details */}
        <div className="md:w-2/3 flex flex-col justify-between px-6">
          <h1 className="text-2xl font-bold text-[#DE3D3A] mb-2">
            {details.title}
          </h1>
          <p className="text-gray-700 text-sm mb-4">{details.description}</p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <p>
              <span className="font-semibold">Author:</span> {details.author}
            </p>
            <p>
              <span className="font-semibold">Illustrator:</span>{" "}
              {details.illustrator}
            </p>
            <p>
              <span className="font-semibold">Copyediting:</span>{" "}
              {details.copyediting}
            </p>
            <p>
              <span className="font-semibold">Book Design:</span>{" "}
              {details.book_design}
            </p>
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {details.books_category}
            </p>
            <p>
              <span className="font-semibold">Age Group:</span>{" "}
              {details.ages_category}
            </p>
            <p>
              <span className="font-semibold">Pages:</span> {details.pages}
            </p>
            <p>
              <span className="font-semibold">Format:</span> {details.format}
            </p>
            <p>
              <span className="font-semibold">Size:</span> {details.size}
            </p>
            <p>
              <span className="font-semibold">ISBN:</span> {details.isbn}
            </p>
            <p>
              <span className="font-semibold">Published:</span>{" "}
              {details.publication_date}
            </p>
          </div>

          {/* Price & Button */}
          <div className="mt-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500 line-through">
                Tk {details.price.original}
              </p>
              <p className="text-2xl font-bold text-[#DE3D3A]">
                Tk {details.price.discounted}
              </p>
            </div>
            <div className="space-x-4">
              <button className="bg-[#DE3D3A] text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700">
                Add to Cart
              </button>
              <button className="bg-[#DE3D3A] text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
