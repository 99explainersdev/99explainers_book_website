"use client";

import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const SignUpPage = () => {
  const searchParams = useSearchParams();
  const path = searchParams.get("redirect");

  const [error, setError] = useState(""); // State for error message

  const handleSocialLogin = async (provider) => {
    try {
      await signIn(provider, {
        redirect: true,
        callbackUrl: path ? path : "/",
      });
    } catch (error) {
      console.error("Social login error:", error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before new request

    const newUser = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/signup/api`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 409) {
        setError("User with this email already exists.");
      } else if (!res.ok) {
        setError("Something went wrong. Please try again.");
      } else {
        // Redirect or show success message
        window.location.href = path ? path : "/";
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary_red px-6">
      <div className="w-full max-w-2xl bg-primary_blue backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">Sign Up</h2>
          <p className="text-purple-200">
            Already a member?{" "}
            <Link
              href="/login"
              className="text-purple-300 font-medium hover:underline hover:text-purple-400"
            >
              Log In
            </Link>
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg mb-8">
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-400 bg-red-900/20 p-2 rounded-lg text-center">
                {error}
              </div>
            )}

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-purple-700 transition-all duration-300"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>

        {/* Social Sign Up Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => handleSocialLogin("google")}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300"
          >
            <FaGoogle className="w-6 h-6" />
            <span className="text-lg font-medium">Sign up with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
