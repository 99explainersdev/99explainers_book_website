"use client";
import { Book } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface CartItem extends Book {
  quantity: number;
}

const cartSlice = createSlice({
  name: "Cart",
  initialState: [] as CartItem[],
  reducers: {
    add(state, action: PayloadAction<Book>) {
      const existingItem = state.find((item) => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item exists
      } else {
        state.push({ ...action.payload, quantity: 1 }); // Add with quantity = 1
      }
    },
    remove(state, action: PayloadAction<string>) {
      return state.filter((item) => item._id !== action.payload);
    },
    decrease(state, action: PayloadAction<string>) {
      const existingItem = state.find((item) => item._id === action.payload);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1; // Decrease quantity
        } else {
          return state.filter((item) => item._id !== action.payload); // Remove if quantity = 1
        }
      }
    },
  },
});

export const { add, remove, decrease } = cartSlice.actions;
export default cartSlice.reducer;