import Image from 'next/image';
import Link from 'next/link';


export const metadata = {
  title: "NOT FOUND",
  description:
    " Not Found",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 text-black">
      <h1 className="text-6xl font-extrabold mb-4 animate-bounce">404</h1>
      <p className="text-2xl font-semibold mb-6">Oops! Page not found.</p>
      <p className="text-lg mb-10 text-center">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/">
        <div className="px-6 py-3 bg-red-600 text-white font-bold rounded-full shadow-lg hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer">
          Go Back Home.
        </div>
      </Link>
      <div className="mt-10">
        <Image
          src="/assets/404.jpg"
          alt="Confused 404"
          width={320}
          height={320}
          className="rounded-xl shadow-lg"
          unoptimized
        />
      </div>
    </div>
  );
}