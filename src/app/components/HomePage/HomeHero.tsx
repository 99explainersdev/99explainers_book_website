"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

function HomeHero() {
  const { data: session } = useSession();
  // console.log("User session:", session); 

  return (
    <section className="bg-red-600 text-white h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-5xl font-bold mb-4 text-shadow-lg">
        Welcome to <span className="text-yellow-300">99explainers</span>
      </h1>
      <p className="text-xl mb-6 max-w-2xl mx-auto">
        Your go-to platform for all things books and knowledge! Explore our collection and dive into the world of endless learning.
      </p>
      <button className="bg-white text-red-600 py-2 px-6 rounded-lg text-lg hover:bg-red-100 transition-all shadow-lg">
        Explore Books
      </button>

      {/* Display logged-in user info */}
      {session?.user && (
        <div className="mt-12 text-3xl max-w-lg mx-auto bg-white p-6 rounded-xl shadow-lg">
          <h2 className="font-semibold text-red-600 mb-2">Logged In User:</h2>
          <p className="text-lg text-gray-700">{session.user.name}</p>
          {session.user.image && (
            <div className="mt-4 flex justify-center">
              <Image
                src={session.user.image}
                alt={`${session.user.name}'s profile picture`}
                width={120}
                height={120}
                className="rounded-full border-4 border-red-600"
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default HomeHero;
