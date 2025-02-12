"use client";
import Link from "next/link";
import { useState, FormEventHandler, useCallback } from "react";
import {
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineSearch,
} from "react-icons/ai";
import Image from "next/image";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const cartItems = useSelector((state: RootState) => state.cart);
  const totalCartItems =
    cartItems.length > 0
      ? cartItems.reduce((total, item) => total + item.quantity, 0)
      : 0;

  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  let dropdownTimeout: NodeJS.Timeout;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();
      router.push(`/books?search=${searchQuery}`);
      setSearchQuery("");
      setMenuOpen(false); // Close the mobile menu after search
    },
    [searchQuery, router]
  );

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
            unoptimized // Add this prop
          />
        </Link>

        {/* Navigation Items */}
        <div className="hidden md:flex items-center space-x-6 justify-center flex-grow">
          <Link href="/" className="text-gray-700 hover:text-red-600">
            Home
          </Link>
          <div
            className="relative group"
            onMouseEnter={() => {
              clearTimeout(dropdownTimeout);
              setDropdownOpen(true);
            }}
            onMouseLeave={() => {
              dropdownTimeout = setTimeout(() => setDropdownOpen(false), 200);
            }}
          >
            <Link
              href="/books"
              className="text-gray-700 hover:text-red-600 flex items-center"
            >
              Books
            </Link>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div
                className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg"
                onMouseEnter={() => {
                  clearTimeout(dropdownTimeout);
                  setDropdownOpen(true);
                }}
                onMouseLeave={() => {
                  dropdownTimeout = setTimeout(
                    () => setDropdownOpen(false),
                    200
                  );
                }}
              >
                <div className="py-1">
                  <Link
                    href="/books"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    All Books
                  </Link>
                  <Link
                    href="/books?category=picture"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Picture Books
                  </Link>
                  <Link
                    href="/books?category=story"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Story Books
                  </Link>
                  <Link
                    href="/books?category=coloring"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Coloring Books
                  </Link>
                  <Link
                    href="/books?category=rhyme"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Rhyme Books
                  </Link>
                  <Link
                    href="/books?category=nonfiction"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Non-Fiction Books
                  </Link>
                  <Link
                    href="/books?category=teen"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Teen Books
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search and Cart */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center relative"
        >
          <input
            type="text"
            placeholder="Search Books..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 rounded-full border focus:outline-none text-black text-sm pl-10"
          />
          <AiOutlineSearch
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500"
          />
        </form>
        <Link
          href="/cart"
          className="relative text-gray-700 hover:text-red-600 ml-4 md:block hidden"
        >
          <AiOutlineShoppingCart size={28} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
            {totalCartItems}
          </span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700 hover:text-red-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <AiOutlineClose size={28} />
          ) : (
            <AiOutlineMenu size={28} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full flex flex-col items-center py-4 space-y-4">
          <form onSubmit={handleSearchSubmit} className="w-4/5 relative hidden">
            <input
              type="text"
              placeholder="Search Books"
              value={searchQuery}
              onChange={handleSearchChange}
              className="p-2 w-full rounded-full border focus:outline-none text-black pl-10"
            />
            <AiOutlineSearch
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500"
            />
          </form>
          <Link href="/" className="text-gray-700 hover:text-red-600">
            Home
          </Link>
          <Link href="/books" className="text-gray-700 hover:text-red-600">
            All Books
          </Link>
          <Link
            href="/books?category=picture"
            className="text-gray-700 hover:text-red-600"
          >
            Picture Books
          </Link>
          <Link
            href="/books?category=story"
            className="text-gray-700 hover:text-red-600"
          >
            Story Books
          </Link>
          <Link
            href="/books?category=coloring"
            className="text-gray-700 hover:text-red-600"
          >
            Coloring Books
          </Link>
          <Link
            href="/books?category=rhyme"
            className="text-gray-700 hover:text-red-600"
          >
            Rhyme Books
          </Link>
          <Link
            href="/books?category=nonfiction"
            className="text-gray-700 hover:text-red-600"
          >
            Non-Fiction Books
          </Link>
          <Link
            href="/books?category=teen"
            className="text-gray-700 hover:text-red-600"
          >
            Teen Books
          </Link>
          <Link
            href="/cart"
            className="relative text-gray-700 hover:text-red-600"
          >
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
