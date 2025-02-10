"use client";
import Link from "next/link";
import { useState, FormEventHandler } from "react";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import Image from "next/image";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cartItems = useSelector((state: RootState) => state.cart);
  const totalCartItems = cartItems.length > 0 
    ? cartItems.reduce((total, item) => total + item.quantity, 0) 
    : 0;

  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("Searching For:", searchQuery);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/Logo-01.png"
            alt="BookStore Logo"
            width={120}
            height={40}
            className="w-32 md:w-48"
          />
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex flex-grow mx-4 relative max-w-lg w-full"
        >
          <input
            type="text"
            placeholder="Search Books"
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 w-full rounded-full border focus:outline-none text-black"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500"
          >
            <AiOutlineSearch size={20} />
          </button>
        </form>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/cart" className="relative text-gray-700 hover:text-red-600">
            <AiOutlineShoppingCart size={28} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
              {totalCartItems}
            </span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700 hover:text-red-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full flex flex-col items-center py-4 space-y-4">
          <form onSubmit={handleSearchSubmit} className="w-4/5 relative">
            <input
              type="text"
              placeholder="Search Books"
              value={searchQuery}
              onChange={handleSearchChange}
              className="p-2 w-full rounded-full border focus:outline-none text-black"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500"
            >
              <AiOutlineSearch size={20} />
            </button>
          </form>
          <Link href="/cart" className="relative text-gray-700 hover:text-red-600">
            <AiOutlineShoppingCart size={28} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
              {totalCartItems}
            </span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;