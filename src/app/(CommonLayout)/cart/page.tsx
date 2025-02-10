"use client";
import React, { useMemo } from "react";
import { add, remove, decrease } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Image from "next/image";
import { Book } from "@/types";
import Link from "next/link";
import { useRouter } from 'next/navigation';

interface CartItem extends Book {
  quantity: number;
}

const Cartpage: React.FC = () => {
  const router = useRouter(); 
  console.log(router)
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart);



  // Calculate total price using useMemo to optimize performance
  const totalPrice = useMemo(() => {
    return cartItems.reduce((total: number, item: CartItem) => {
      return total + (item.price.discounted * item.quantity);
    }, 0);
  }, [cartItems]);

  const handleIncrease = (book: Book) => {
    dispatch(add(book)); // Increase quantity
  };

  const handleDecrease = (id: string) => {
    dispatch(decrease(id)); // Decrease quantity, remove if quantity = 1
  };

  const handleRemove = (id: string) => {
    dispatch(remove(id)); // Remove item completely
  };

  const handleCheckout = () => {
    router.push('/checkout'); // Use router.push to navigate
  };
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-[150px]">
      
      <div className="max-w-6xl mx-auto">


         {/* Breadcrumb */}
         <nav className="py-5 flex items-center text-lg">
        <Link
          href="/"
          className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          Home
        </Link>
        <span className="mx-3 text-gray-400">/</span>
        <Link
          href="/books"
          className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          Books
        </Link>
        <span className="mx-3 text-gray-400">/</span>
        <Link
          href="/cart"
          className="text-black  transition-colors duration-200 font-bold"
        >
          Cart
        </Link>
       
       
      </nav>

        <h3 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
          Your Cart
        </h3>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="space-y-8">
              {cartItems.map((item: CartItem) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-center bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Image Section */}
                  <div className="flex-shrink-0 w-40 h-40 sm:w-48 sm:h-48">
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      height={150}
                      width={150}
                      className="rounded-md object-cover w-full h-full"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="mt-6 sm:mt-0 sm:ml-6 flex-grow">
                    <h5 className="text-2xl font-bold text-gray-900">
                      {item.title}
                    </h5>
                    <p className="text-lg text-gray-600 mt-2">
                      ৳ {item.price.discounted} x {item.quantity}
                    </p>
                    <p className="text-xl font-semibold text-gray-900 mt-2">
                      Total: ৳ {(item.price.discounted * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-4 mt-6 sm:mt-0">
                    <button
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300 transition-colors duration-200"
                      onClick={() => handleDecrease(item._id)}
                    >
                      -
                    </button>
                    <span className="text-xl font-medium">{item.quantity}</span>
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
                      onClick={() => handleIncrease(item)}
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors duration-200 mt-6 sm:mt-0 sm:ml-6"
                    onClick={() => handleRemove(item._id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Total Price Section */}
            <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center">
                <h4 className="text-2xl font-bold text-gray-900">Cart Total</h4>
                <p className="text-3xl font-bold text-primary_blue">
                  ৳ {totalPrice.toFixed(2)}
                </p>
              </div>
              <button 
                className="w-full mt-6 bg-primary_blue text-white text-xl font-semibold px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cartpage;