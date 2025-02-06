"use client";
import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-90 z-50">
      <div className="text-center">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <p className="text-lg mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;