// Step : 2 Purpose: This file configures the Redux store, which is the central data repository for your application.
// Step : 3 is in the cart page/ or whatever page the user uses to invoke the reducer function 
"use client";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

// configureStore: A function from Redux Toolkit that simplifies the creation of a Redux store.
// cartReducer: The reducer from cartSlice.ts that manages the cart state.
//^^^^^^^^^^^^^^^^ The docs are for above code ^^^^^^^^^^^^^^^^^^^^^^//
const store = configureStore({
  reducer: {
    cart: cartReducer, //reducer: An object that maps slice names to reducer functions. In this case, it maps the name "cart" to the cartReducer.
  },
});

// It takes an object with a reducer property.
// reducer: An object that maps slice names to reducer functions. In this case, it maps the name "cart" to the cartReducer.
//  This tells the store that the cartReducer is responsible for managing the part of the state that's named "cart".
//^^^^^^^^^^^^^^^^ The docs are for above code ^^^^^^^^^^^^^^^^^^^^^^//
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// RootState: Defines the type of the entire Redux state object. ReturnType<typeof store.getState>
// automatically infers the type based on the reducers that are configured in the store.
// AppDispatch: Defines the type of the dispatch function, which is used to dispatch actions to the store.
//^^^^^^^^^^^^^^^^ The docs are for above code ^^^^^^^^^^^^^^^^^^^^^^//
export default store;


