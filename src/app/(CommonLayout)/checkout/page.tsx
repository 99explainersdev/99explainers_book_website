"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaShoppingCart, FaTruck } from "react-icons/fa";
import Image from "next/image";

const CheckoutPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("insideDhaka"); // Default value


  // K
  const cartItems = useSelector((state: RootState) => state.cart);
  const totalPrice = useMemo(() => {
    return cartItems.reduce((total: number, item: { price: { discounted: number }, quantity: number }) => {
      return total + (item.price.discounted * item.quantity);
    }, 0);
  }, [cartItems]);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { name, email, phone, address, city, zip, deliveryOption, cartItems };
    console.log("Checkout Form Data:", formData);
    router.push('/thank-you');
  };

  const orderSummaryClasses = useMemo(() => {
    let classes = 'divide-y divide-gray-200 overflow-y-auto';

    if (cartItems.length > 4) {
      classes += ' max-h-[400px]';
    } else {
      classes += ' max-h-none';
    }

    return classes;
  }, [cartItems.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8 pt-[150px]">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-primary_red text-white py-8 px-8 flex items-center justify-between">
          <h2 className="text-3xl font-semibold tracking-wide">Checkout Information</h2>
        </div>

        {/* Main Content Area */}
        <div className="p-8">
          {/* Breadcrumb */}
          <nav className="pb-6 flex items-center text-lg">
            <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
              Home
            </Link>
            <span className="mx-3 text-gray-400">/</span>
            <Link href="/cart" className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
              Cart
            </Link>
            <span className="mx-3 text-gray-400">/</span>
            <Link href="/checkout" className="text-primary_blue transition-colors duration-200 font-bold">
              Checkout
            </Link>
          </nav>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Your cart is empty</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Order Summary */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FaShoppingCart className="text-primary_red" /> Order Summary
                </h3>
                <ul className={orderSummaryClasses}>
                  {cartItems.map((item: { _id: string; image_url: string; title: string; description: string; price: { discounted: number }; quantity: number }) => (
                    <li key={item._id} className="py-4 flex items-center space-x-4">
                      {/* Image */}
                      <div className="flex-shrink-0 w-20 h-20">
                        <Image
                          src={item.image_url}
                          alt={item.title}
                          width={80}
                          height={80}
                          className="rounded-md object-cover"
                        />
                      </div>

                      {/* Item Info */}
                      <div className="flex-grow">
                        <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                      </div>

                      {/* Quantity and Price */}
                      <div className="text-right">
                        <p className="text-primary_red font-bold w-[150px]">Quantity: {item.quantity}</p>
                        <p className="text-gray-900 font-semibold">
                          ৳ {(item.price.discounted * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Cart Total */}
                <div className="bg-gray-50 rounded-xl p-6 mt-6 shadow-inner">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-bold text-gray-900">Cart Total</h4>
                    <p className="text-3xl font-bold text-primary_blue whitespace-nowrap">৳ {totalPrice.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Checkout Form */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FaUser className="text-primary_red" /> Shipping Information
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="name" className="text-gray-700 text-sm font-bold mb-2 flex items-center gap-2">
                      <FaUser className="text-primary_red" /> Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label htmlFor="email" className="text-gray-700 text-sm font-bold mb-2 flex items-center gap-2">
                      <FaEnvelope className="text-primary_red" /> Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phone" className="text-gray-700 text-sm font-bold mb-2 flex items-center gap-2">
                      <FaPhone className="text-primary_red" /> Phone Number
                    </label>
                    <input
                      type="tel" // Use type="tel" for phone number
                      id="phone"
                      className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <label htmlFor="address" className="text-gray-700 text-sm font-bold mb-2 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-primary_red" /> Shipping Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter your shipping address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>

                  {/* City and Zip Code */}
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">City</label>
                      <input
                        type="text"
                        id="city"
                        className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>
                    <div className="w-1/2">
                      <label htmlFor="zip" className="block text-gray-700 text-sm font-bold mb-2">ZIP Code</label>
                      <input
                        type="text"
                        id="zip"
                        className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="ZIP Code"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Delivery Option */}
                  <div>
                    <label htmlFor="deliveryOption" className="text-gray-700 text-sm font-bold mb-2 flex items-center gap-2"><FaTruck className="text-primary_red"/>Delivery Option</label>
                    <select
                      id="deliveryOption"
                      className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={deliveryOption}
                      onChange={(e) => setDeliveryOption(e.target.value)}
                    >
                      <option value="insideDhaka">Delivery inside Dhaka</option>
                      <option value="outsideDhaka">Delivery outside Dhaka</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-primary_red hover:bg-red-700 text-white font-bold py-4 px-7 rounded-xl focus:outline-none focus:shadow-outline transition-colors duration-300"
                    >
                      Complete Order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;