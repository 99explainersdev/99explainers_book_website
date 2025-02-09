import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#3A2E92] text-white pt-32 md:pt-64 pb-12">
            <div className="container mx-auto px-4 flex flex-col items-center">
                {/* NewsLetter Section */}
                <div className="text-center mb-12 w-full max-w-2xl px-4">
                    <h3 className="text-3xl md:text-5xl font-semibold mb-6">
                        Subscribe to our Newsletter
                    </h3>

                    <form className="flex flex-col md:flex-row justify-center items-center w-full">
                        <input 
                            type="email"
                            placeholder="Email"
                            className="text-black px-6 py-3 rounded-full focus:outline-none w-full md:w-96 text-lg md:text-2xl"
                        />
                        {/* <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-r-md font-semibold">
                            Subscribe
                        </button> */}
                    </form>
                </div>

                {/* Logo & Social Icons Section */}
                <div className="flex flex-col md:flex-row justify-between items-center w-full mt-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center mb-6 md:mb-0">
                        <Image src="/assets/logo.png" alt="BookStore Logo" width={200} height={200} className="w-40 md:w-52" />
                    </Link>

                    {/* Social Icons */}
                    <div className="flex space-x-4">
                        <Link href="#" className="hover:text-yellow-500">
                            <FaFacebook size={32} />
                        </Link>
                        <Link href="#" className="hover:text-yellow-500">
                            <FaInstagram size={32} />
                        </Link>
                        <Link href="#" className="hover:text-yellow-500">
                            <FaYoutube size={32} />
                        </Link>
                        <Link href="#" className="hover:text-yellow-500">
                            <FaWhatsapp size={32} />
                        </Link>
                        <Link href="#" className="hover:text-yellow-500">
                            <FaLinkedin size={32} />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
