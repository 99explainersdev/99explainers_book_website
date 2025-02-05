// "use client";
// import React from "react";
// import { remove } from "../../redux/cartSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../redux/store"; 
// import Image from "next/image";
// import { Book } from "@/types";



// const Cartpage: React.FC = () => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state: RootState) => state.cart);

//   const handleRemove = (id: string) => {
//     dispatch(remove(id));
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4 pt-[150px]">
//       <h3 className="text-3xl font-bold text-center mb-8">Your Cart</h3>
//       <div className="space-y-6">
//         {cartItems.map((item: Book) => (
//           <div
//             key={item._id}
//             className="flex items-center bg-white shadow-md rounded-lg p-4"
//           >
//             {/* Image Section */}
//             <div className="flex-shrink-0">
//               <Image
//                 src={item.image_url}
//                 alt={item.title}
//                 height={150}
//                 width={150}
//                 className="rounded-md"
//               />
//             </div>

//             {/* Content Section */}
//             <div className="ml-4 flex-grow">
//               <h5 className="text-lg font-semibold text-gray-800">
//                 {item.title}
//               </h5>
//               <h5 className="text-lg font-medium text-gray-600 mt-2">
//                 ${item.price.discounted}
//               </h5>
//             </div>

//             {/* Button Section */}
//             <button
//               className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
//               onClick={() => handleRemove(item._id)}
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Cartpage;
"use client";
import React from "react";
import { add, remove, decrease } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store"; 
import Image from "next/image";
import { Book } from "@/types";

interface CartItem extends Book {
  quantity: number;
}

const Cartpage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart);

  const handleIncrease = (book: Book) => {
    dispatch(add(book));  // Increase quantity
  };

  const handleDecrease = (id: string) => {
    dispatch(decrease(id)); // Decrease quantity, remove if quantity = 1
  };

  const handleRemove = (id: string) => {
    dispatch(remove(id)); // Remove item completely
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 pt-[150px]">
      <h3 className="text-3xl font-bold text-center mb-8">Your Cart</h3>
      <div className="space-y-6">
        {cartItems.map((item: CartItem) => (
          <div
            key={item._id}
            className="flex items-center bg-white shadow-md rounded-lg p-4"
          >
            {/* Image Section */}
            <div className="flex-shrink-0">
              <Image
                src={item.image_url}
                alt={item.title}
                height={150}
                width={150}
                className="rounded-md"
              />
            </div>

            {/* Content Section */}
            <div className="ml-4 flex-grow">
              <h5 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h5>
              <h5 className="text-lg font-medium text-gray-600 mt-2">
                ${item.price.discounted} x {item.quantity}
              </h5>
              <h5 className="text-lg font-medium text-gray-800">
                Total: ${(item.price.discounted * item.quantity).toFixed(2)}
              </h5>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-2">
              <button
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                onClick={() => handleIncrease(item)}
              >
                +
              </button>
              <span className="text-lg font-medium">{item.quantity}</span>
              <button
                className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
                onClick={() => handleDecrease(item._id)}
              >
                -
              </button>
            </div>

            {/* Remove Button */}
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-4"
              onClick={() => handleRemove(item._id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cartpage;
